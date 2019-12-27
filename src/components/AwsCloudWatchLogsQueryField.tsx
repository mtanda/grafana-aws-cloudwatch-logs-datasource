import _ from 'lodash';
import React from 'react';

import { QueryField, SlatePrism } from '@grafana/ui';
import { ExploreQueryFieldProps } from '@grafana/data';
import AwsCloudWatchLogsDatasource from '../datasource';
import { AwsCloudWatchLogsQuery, AwsCloudWatchLogsOptions } from '../types';

interface Props extends ExploreQueryFieldProps<AwsCloudWatchLogsDatasource, AwsCloudWatchLogsQuery, AwsCloudWatchLogsOptions> {}
interface State {
  syntaxLoaded: boolean;
}

class AwsCloudWatchLogsDatasourceQueryField extends React.PureComponent<Props, State> {
  plugins: any[];

  constructor(props: Props, context: React.Context<any>) {
    super(props, context);

    this.plugins = [
      SlatePrism({
        onlyIn: (node: any) => node.type === 'code_block',
        getSyntax: (node: any) => 'lucene',
      }),
    ];

    this.state = {
      syntaxLoaded: false,
    };
  }

  componentDidMount() {
    if (!(this.props.query.format === 'table')) {
      this.onChangeQuery('', true);
    }
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps: Props) {
    // if query changed from the outside (i.e. cleared via explore toolbar)
    if (!(this.props.query.format === 'table')) {
      this.onChangeQuery('', true);
    }
  }

  onChangeQuery = (value: string, override?: boolean) => {
    // Send text change to parent
    const { query, onChange, onRunQuery } = this.props;
    if (onChange) {
      const nextQuery: AwsCloudWatchLogsQuery = {
        ...query,
        region: 'ap-northeast-1',
        logGroupName: '',
        logStreamNames: [],
        queryString: value,
        format: 'table',
        limit: '10',
        useInsights: true,
        fromLogPanel: true,
      };
      onChange(nextQuery);

      if (override && onRunQuery) {
        onRunQuery();
      }
    }
  };

  render() {
    const { data, query } = this.props;
    const { syntaxLoaded } = this.state;

    return (
      <>
        <div className="gf-form-inline gf-form-inline--nowrap">
          <div className="gf-form gf-form--grow flex-shrink-1">
            <QueryField
              additionalPlugins={this.plugins}
              query={query.queryString}
              onChange={this.onChangeQuery}
              onRunQuery={this.props.onRunQuery}
              placeholder="Enter a insights query"
              portalOrigin="mtanda-aws-cloudwatch-logs-datasource"
              syntaxLoaded={syntaxLoaded}
            />
          </div>
        </div>
        {data && data.error ? <div className="prom-query-field-info text-error">{data.error.message}</div> : null}
      </>
    );
  }
}

export default AwsCloudWatchLogsDatasourceQueryField;
