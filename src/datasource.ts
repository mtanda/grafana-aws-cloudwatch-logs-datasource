import _ from 'lodash';
import TableModel from 'grafana/app/core/table_model';
import flatten from 'grafana/app/core/utils/flatten';
import { DataSourceApi, DataSourceInstanceSettings, DataQueryRequest, DataQueryResponse } from '@grafana/ui';
import { LoadingState } from '@grafana/data';
import { AwsCloudWatchLogsQuery, AwsCloudWatchLogsOptions } from './types';
import { Observable, merge, from, of } from 'rxjs';
import { scan, map } from 'rxjs/operators';

export default class AwsCloudWatchLogsDatasource extends DataSourceApi<AwsCloudWatchLogsQuery, AwsCloudWatchLogsOptions> {
  type: string;
  url: any;
  name: string;
  id: any;
  defaultRegion: string;

  /** @ngInject */
  constructor(
    instanceSettings: DataSourceInstanceSettings<AwsCloudWatchLogsOptions>,
    private backendSrv: any,
    private templateSrv: any,
    private timeSrv: any
  ) {
    super(instanceSettings);
    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
    const settingsData = instanceSettings.jsonData || ({} as AwsCloudWatchLogsOptions);
    this.defaultRegion = settingsData.defaultRegion;
  }

  query(options: DataQueryRequest<AwsCloudWatchLogsQuery>): Observable<DataQueryResponse> {
    const query = this.buildQueryParameters(options);
    query.targets = query.targets.filter(t => !t.hide);

    if (query.targets.length <= 0) {
      return of({ state: LoadingState.Done, data: [] });
    }

    const subQueries = query.targets.map(target => {
      if (target.liveStreaming) {
        return this.doLiveRequest({ data: query });
      }
      return from(this.doRequest({ data: query }));
    });

    return merge(...subQueries);
  }

  testDatasource() {
    return this.doMetricQueryRequest('log_group_names', {
      region: this.defaultRegion,
      logGroupNamePrefix: 'test',
    })
      .then(res => {
        return Promise.resolve({ status: 'success', message: 'Data source is working', title: 'Success' });
      })
      .catch(err => {
        return { status: 'error', message: err.message, title: 'Error' };
      });
  }

  async doRequest(options) {
    const results = await Promise.all(
      options.data.targets.map(async target => {
        if (!target.useInsights) {
          return await this.backendSrv.datasourceRequest({
            url: '/api/tsdb/query',
            method: 'POST',
            data: {
              from: options.data.range.from.valueOf().toString(),
              to: options.data.range.to.valueOf().toString(),
              queries: [target],
            },
          });
        } else {
          const startResult = await this.backendSrv.datasourceRequest({
            url: '/api/tsdb/query',
            method: 'POST',
            data: {
              from: options.data.range.from.valueOf().toString(),
              to: options.data.range.to.valueOf().toString(),
              queries: [target],
            },
          });
          const queryId = startResult.data.results[target.refId].meta.QueryId;
          target.queryId = queryId;
          let queryResult;
          for (let i = 0; i < 60; i++) {
            queryResult = await this.backendSrv.datasourceRequest({
              url: '/api/tsdb/query',
              method: 'POST',
              data: {
                from: options.data.range.from.valueOf().toString(),
                to: options.data.range.to.valueOf().toString(),
                queries: [target],
              },
            });
            const status = queryResult.data.results[target.refId].meta.Status;
            if (status === 'Complete') {
              break;
            } else if (_.includes(['Failed', 'Cancelled'], status)) {
              throw new Error('insights query failed');
            } else {
              await this.delay(1000);
              continue; // in progress
            }
          }
          return queryResult;
        }
      })
    );

    const resultsMap = {};
    _.each(results, (result: any) => {
      _.each(result.data.results, r => {
        resultsMap[r.refId] = r;
      });
    });
    const res: any = [];
    for (const target of options.data.targets) {
      const r = resultsMap[target.refId];
      if (!_.isEmpty(r.series)) {
        _.forEach(r.series, s => {
          res.push({ target: s.name, datapoints: s.points });
        });
      }
      if (!_.isEmpty(r.tables)) {
        _.forEach(r.tables, t => {
          res.push(this.expandMessageField(t));
        });
      }
    }

    return {
      data: res,
    };
  }

  doLiveRequest(options) {
    return options.data.targets.map(async target => {
      return new Observable(observer => {
        (async () => {
          const intervalMs = 5 * 1000;
          let lastTo = new Date().valueOf();
          for (let i = 0; i < 10; i++) {
            const queryResult = await this.backendSrv.datasourceRequest({
              url: '/api/tsdb/query',
              method: 'POST',
              data: {
                from: (lastTo - (intervalMs)).toString(),
                to: lastTo.toString(),
                queries: [target],
              },
            });
            observer.next(queryResult);
            await this.delay(intervalMs);
          }
          observer.complete();
        })();
      }).pipe(
        scan((acc: any, one: any) => {
          if (one.series) {
            // tood
          } else if (one.tables) {
            // tood
          }
          acc = one;
          return acc;
        }, {}),
        map((queryResult: any) => {
          if (queryResult.series) {
            return {
              key: `aws-cloudwatch-logs-${target.refId}`,
              state: LoadingState.Streaming,
              data: queryResult,
            };
          } else {
            return {
              key: `aws-cloudwatch-logs-${target.refId}`,
              state: LoadingState.Streaming,
              data: queryResult.tables.map(t => this.expandMessageField(t)),
            };
          }
        })
      );
    });
  }

  delay(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

  buildQueryParameters(options) {
    const targets = options.targets
      .filter(target => {
        return !!target.logGroupName;
      })
      .map(target => {
        let input: any = {};
        let inputInsightsStartQuery: any = {};

        // backward compatibility
        if (_.isNumber(target.limit)) {
          target.limit = String(target.limit);
        }

        if (!target.useInsights) {
          input = {
            logGroupName: this.templateSrv.replace(target.logGroupName, options.scopedVars),
            logStreamNames: _.flatten(
              target.logStreamNames
                .filter(n => n !== '')
                .map(n => {
                  const replaced = this.templateSrv.replace(n, options.scopedVars, 'json');
                  if (n !== replaced) {
                    return JSON.parse(replaced);
                  } else {
                    return n;
                  }
                })
            ),
            filterPattern: this.templateSrv.replace(target.filterPattern, options.scopedVars),
            limit: parseInt(this.templateSrv.replace(target.limit, options.scopedVars), 10),
            interleaved: false,
          };
          if (input.logStreamNames.length === 0) {
            delete input.logStreamNames;
          }
        } else {
          const logGroupName = this.templateSrv.replace(target.logGroupName, options.scopedVars);
          inputInsightsStartQuery = {
            queryString: this.templateSrv.replace(target.queryString, options.scopedVars),
            limit: parseInt(this.templateSrv.replace(target.limit, options.scopedVars), 10),
          };
          if (logGroupName.indexOf(',') >= 0) {
            inputInsightsStartQuery.logGroupNames = logGroupName.split(',');
          } else {
            inputInsightsStartQuery.logGroupName = logGroupName;
          }
        }

        return {
          refId: target.refId,
          hide: target.hide,
          datasourceId: this.id,
          queryType: 'timeSeriesQuery',
          format: target.format || 'timeserie',
          region: this.templateSrv.replace(target.region, options.scopedVars) || this.defaultRegion,
          useInsights: target.useInsights,
          liveStreaming: target.liveStreaming,
          legendFormat: target.legendFormat,
          timestampColumn: target.timestampColumn,
          valueColumn: target.valueColumn,
          startFromHead: !_.isUndefined(target.startFromHead) ? target.startFromHead : true,
          input: input,
          inputInsightsStartQuery: inputInsightsStartQuery,
        };
      });

    options.targets = targets;
    return options;
  }

  expandMessageField(originalTable) {
    const table = new TableModel();
    let i, j;
    const metricLabels = {};

    if (originalTable.rows.length === 0) {
      return table;
    }
    table.columns = originalTable.columns;

    // Collect all labels across all metrics
    const messageIndex = table.columns.findIndex(c => {
      return c.text === 'Message';
    });
    const messages = originalTable.rows.map(r => {
      let messageJson = {};
      try {
        if (r[messageIndex][0] === '{') {
          messageJson = JSON.parse(r[messageIndex]);
        }
      } catch (err) {
        // ignore error
      }
      return messageJson;
    });
    _.each(messages.slice(0, 100), message => {
      const flattened = flatten(message, null);
      for (const propName in flattened) {
        metricLabels[propName] = 1;
      }
    });

    // Sort metric labels, create columns for them and record their index
    const sortedLabels = _.keys(metricLabels).sort();
    _.each(sortedLabels, (label, labelIndex) => {
      metricLabels[label] = labelIndex + 1;
      table.columns.push({ text: label });
    });

    // Populate rows, set value to empty string when label not present.
    for (i = 0; i < originalTable.rows.length; i++) {
      const reordered = originalTable.rows[i];
      const message = messages[i];
      for (j = 0; j < sortedLabels.length; j++) {
        const label = sortedLabels[j];
        reordered.push(_.get(message, label) || '');
      }
      table.rows.push(reordered);
    }

    return table;
  }

  metricFindQuery(query) {
    let region;

    const logGroupNamesQuery = query.match(/^log_group_names\(([^,]+?),\s?(.+)\)/);
    if (logGroupNamesQuery) {
      region = logGroupNamesQuery[1];
      const prefix = logGroupNamesQuery[2];
      return this.doMetricQueryRequest('log_group_names', {
        region: this.templateSrv.replace(region),
        logGroupNamePrefix: this.templateSrv.replace(prefix),
      });
    }

    const logStreamNamesQuery = query.match(/^log_stream_names\(([^,]+?),\s?(.+)\)/);
    if (logStreamNamesQuery) {
      region = logStreamNamesQuery[1];
      const logGroupName = logStreamNamesQuery[2];
      return this.doMetricQueryRequest('log_stream_names', {
        region: this.templateSrv.replace(region),
        logGroupName: this.templateSrv.replace(logGroupName),
        logStreamNamePrefix: '',
      });
    }

    return Promise.resolve([]);
  }

  doMetricQueryRequest(subtype, parameters) {
    const range = this.timeSrv.timeRange();
    return this.backendSrv
      .datasourceRequest({
        url: '/api/tsdb/query',
        method: 'POST',
        data: {
          from: range.from.valueOf().toString(),
          to: range.to.valueOf().toString(),
          queries: [
            _.extend(
              {
                refId: 'metricFindQuery',
                datasourceId: this.id,
                queryType: 'metricFindQuery',
                subtype: subtype,
              },
              parameters
            ),
          ],
        },
      })
      .then(r => {
        return this.transformSuggestDataFromTable(r.data);
      });
  }

  transformSuggestDataFromTable(suggestData) {
    return _.map(suggestData.results['metricFindQuery'].tables[0].rows, v => {
      return {
        text: v[0],
        value: v[1],
      };
    });
  }

  annotationQuery(options) {
    const annotation = options.annotation;
    const region = annotation.region || this.defaultRegion;
    const logGroupName = annotation.logGroupName || '';
    const filterPattern = annotation.filterPattern || '';
    let tagKeys = annotation.tagKeys || '';
    tagKeys = tagKeys.split(',');
    const titleFormat = annotation.titleFormat || '';
    const textFormat = annotation.textFormat || '';

    if (_.isEmpty(region) || _.isEmpty(logGroupName)) {
      return Promise.resolve([]);
    }

    const range = this.timeSrv.timeRange();
    return this.backendSrv
      .datasourceRequest({
        url: '/api/tsdb/query',
        method: 'POST',
        data: {
          from: range.from.valueOf().toString(),
          to: range.to.valueOf().toString(),
          queries: [
            {
              refId: 'annotationQuery',
              datasourceId: this.id,
              queryType: 'annotationQuery',
              region: this.templateSrv.replace(region),
              input: {
                logGroupName: this.templateSrv.replace(logGroupName),
                filterPattern: this.templateSrv.replace(filterPattern),
                interleaved: false,
              },
            },
          ],
        },
      })
      .then(r => {
        if (!r.data.results[''].meta.Events) {
          return [];
        }
        const eventList = r.data.results[''].meta.Events.map(event => {
          const messageJson = JSON.parse(event.Message);
          const tags = _.chain(messageJson)
            .filter((v, k) => {
              return _.includes(tagKeys, k);
            })
            .value();

          return {
            annotation: annotation,
            time: event.Timestamp,
            title: this.renderTemplate(titleFormat, messageJson),
            tags: tags,
            text: this.renderTemplate(textFormat, messageJson),
          };
        });

        return eventList;
      });
  }

  renderTemplate(aliasPattern, aliasData) {
    const aliasRegex = /\{\{\s*(.+?)\s*\}\}/g;
    return aliasPattern.replace(aliasRegex, (match, g1) => {
      if (aliasData[g1]) {
        return aliasData[g1];
      }
      return g1;
    });
  }
}
