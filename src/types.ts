import { DataQuery, DataSourceJsonData } from '@grafana/ui';

export interface AwsCloudWatchLogsOptions extends DataSourceJsonData {
  defaultRegion: string;
}

export interface AwsCloudWatchLogsQuery extends DataQuery {
  refId: string;
  format?: 'timeserie' | 'table' | 'logs';
  region?: string;
  logGroupName?: string;
  logStreamNames?: string[];
  filterPattern?: string;
  queryString?: string;
  limit?: string;
  legendFormat?: string;
  timestampColumn?: string;
  valueColumn?: string;
}
