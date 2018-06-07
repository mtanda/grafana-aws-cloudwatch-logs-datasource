import _ from "lodash";
import TableModel from 'app/core/table_model';

export class AwsCloudWatchLogsDatasource {
  constructor(instanceSettings, $q, backendSrv, templateSrv, timeSrv) {
    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
    this.defaultRegion = instanceSettings.jsonData.defaultRegion;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.timeSrv = timeSrv;
  }

  query(options) {
    let query = this.buildQueryParameters(options);
    query.targets = query.targets.filter(t => !t.hide);

    if (query.targets.length <= 0) {
      return this.q.when({ data: [] });
    }

    return this.doRequest({
      data: query
    });
  }

  testDatasource() {
    return this.doMetricQueryRequest('log_group_names', {
      region: this.defaultRegion,
      prefix: 'test'
    }).then(res => {
      return this.q.when({ status: "success", message: "Data source is working", title: "Success" });
    }).catch(err => {
      return { status: "error", message: err.message, title: "Error" };
    });
  }

  doRequest(options) {
    return this.backendSrv.datasourceRequest({
      url: '/api/tsdb/query',
      method: 'POST',
      data: {
        from: options.data.range.from.valueOf().toString(),
        to: options.data.range.to.valueOf().toString(),
        queries: options.data.targets,
      }
    }).then(result => {
      let res = [];
      _.forEach(result.data.results, r => {
        if (!_.isEmpty(r.series)) {
          _.forEach(r.series, s => {
            res.push({ target: s.name, datapoints: s.points });
          })
        }
        if (!_.isEmpty(r.tables)) {
          _.forEach(r.tables, t => {
            let table = new TableModel()
            table.columns = t.columns
            table.rows = t.rows
            res.push(table);
          })
        }
      })

      result.data = res;
      return result;
    });
  }

  buildQueryParameters(options) {
    let targets = _.map(options.targets, target => {
      return {
        refId: target.refId,
        hide: target.hide,
        datasourceId: this.id,
        queryType: 'timeSeriesQuery',
        format: target.type || 'timeserie',
        region: this.templateSrv.replace(target.region, options.scopedVars) || this.defaultRegion,
        input: {
          logGroupName: this.templateSrv.replace(target.logGroupName, options.scopedVars),
          filterPattern: this.templateSrv.replace(target.filterPattern, options.scopedVars),
          interleaved: false
        }
      };
    });

    options.targets = targets;
    return options;
  }

  metricFindQuery(query) {
    let region;

    let logGroupNamesQuery = query.match(/^log_group_names\(([^,]+?),\s?(.+)\)/);
    if (logGroupNamesQuery) {
      region = logGroupNamesQuery[1];
      let prefix = logGroupNamesQuery[2];
      return this.doMetricQueryRequest('log_group_names', {
        region: this.templateSrv.replace(region),
        prefix: this.templateSrv.replace(prefix)
      });
    }

    let logStreamNamesQuery = query.match(/^log_stream_names\(([^,]+?),\s?(.+)\)/);
    if (logStreamNamesQuery) {
      region = logStreamNamesQuery[1];
      let logGroupName = logStreamNamesQuery[2];
      return this.doMetricQueryRequest('log_stream_names', {
        region: this.templateSrv.replace(region),
        logGroupName: this.templateSrv.replace(logGroupName)
      });
    }


    return this.$q.when([]);
  }

  doMetricQueryRequest(subtype, parameters) {
    var range = this.timeSrv.timeRange();
    return this.backendSrv.datasourceRequest({
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
      }
    }).then(r => {
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
    let annotation = options.annotation;
    let region = annotation.region || this.defaultRegion;
    let logGroupName = annotation.logGroupName || '';
    let filterPattern = annotation.filterPattern || '';
    let tagKeys = annotation.tagKeys || '';
    tagKeys = tagKeys.split(',');
    let titleFormat = annotation.titleFormat || '';
    let textFormat = annotation.textFormat || '';

    if (_.isEmpty(region) || _.isEmpty(logGroupName)) { return Promise.resolve([]); }

    let range = this.timeSrv.timeRange();
    return this.backendSrv.datasourceRequest({
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
              interleaved: false
            }
          }
        ]
      }
    }).then(r => {
      if (!r.data.results[""].meta.Events) {
        return [];
      }
      let eventList = r.data.results[""].meta.Events.map((event) => {
        let messageJson = JSON.parse(event.Message);
        let tags = _.chain(messageJson)
          .filter((v, k) => {
            return _.includes(tagKeys, k);
          }).value();

        return {
          annotation: annotation,
          time: event.Timestamp,
          title: this.renderTemplate(titleFormat, messageJson),
          tags: tags,
          text: this.renderTemplate(textFormat, messageJson)
        };
      });

      return eventList;
    });
  }

  renderTemplate(aliasPattern, aliasData) {
    var aliasRegex = /\{\{\s*(.+?)\s*\}\}/g;
    return aliasPattern.replace(aliasRegex, function (match, g1) {
      if (aliasData[g1]) {
        return aliasData[g1];
      }
      return g1;
    });
  }
}
