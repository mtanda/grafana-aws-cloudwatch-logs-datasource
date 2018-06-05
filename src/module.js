import { AwsCloudWatchLogsDatasource } from './datasource';
import { AwsCloudWatchLogsDatasourceQueryCtrl } from './query_ctrl';
import { AwsCloudWatchLogsAnnotationsQueryCtrl } from './annotations_query_ctrl';

class AwsCloudWatchLogsDatasourceConfigCtrl { }
AwsCloudWatchLogsDatasourceConfigCtrl.templateUrl = 'partials/config.html';

export {
  AwsCloudWatchLogsDatasource as Datasource,
  AwsCloudWatchLogsDatasourceQueryCtrl as QueryCtrl,
  AwsCloudWatchLogsDatasourceConfigCtrl as ConfigCtrl,
  AwsCloudWatchLogsAnnotationsQueryCtrl as AnnotationsQueryCtrl
};
