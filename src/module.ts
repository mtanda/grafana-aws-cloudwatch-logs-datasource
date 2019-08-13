import AwsCloudWatchLogsDatasource from './datasource';
import { AwsCloudWatchLogsDatasourceQueryCtrl } from './query_ctrl';
import { AwsCloudWatchLogsAnnotationsQueryCtrl } from './annotations_query_ctrl';
import { AwsCloudWatchLogsDatasourceConfigCtrl } from './config_ctrl';
import { AwsCloudWatchLogsDatasourceQueryField } from './components/AwsCloudWatchLogsQueryField';
import AwsCloudWatchLogsDatasourceStartPage from './components/AwsCloudWatchLogsStartPage';
import { DataSourcePlugin } from '@grafana/ui';
import { AwsCloudWatchLogsQuery, AwsCloudWatchLogsOptions } from './types';

export const plugin = new DataSourcePlugin<AwsCloudWatchLogsDatasource, AwsCloudWatchLogsQuery, AwsCloudWatchLogsOptions>(AwsCloudWatchLogsDatasource)
  .setConfigCtrl(AwsCloudWatchLogsDatasourceConfigCtrl)
  .setQueryCtrl(AwsCloudWatchLogsDatasourceQueryCtrl)
  .setAnnotationQueryCtrl(AwsCloudWatchLogsAnnotationsQueryCtrl)
  .setExploreLogsQueryField(AwsCloudWatchLogsDatasourceQueryField)
  .setExploreStartPage(AwsCloudWatchLogsDatasourceStartPage);
