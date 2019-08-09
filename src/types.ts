import { DataQuery, DataSourceJsonData } from '@grafana/ui/types';

export interface AwsCloudWatchLogsOptions extends DataSourceJsonData {
    defaultRegion: string;
}

export interface AwsCloudWatchLogsQuery extends DataQuery {
    format?: 'timeserie' | 'table';
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
