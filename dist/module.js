'use strict';

System.register(['./datasource', './query_ctrl', './annotations_query_ctrl', './config_ctrl'], function (_export, _context) {
  "use strict";

  var AwsCloudWatchLogsDatasource, AwsCloudWatchLogsDatasourceQueryCtrl, AwsCloudWatchLogsAnnotationsQueryCtrl, AwsCloudWatchLogsDatasourceConfigCtrl;
  return {
    setters: [function (_datasource) {
      AwsCloudWatchLogsDatasource = _datasource.AwsCloudWatchLogsDatasource;
    }, function (_query_ctrl) {
      AwsCloudWatchLogsDatasourceQueryCtrl = _query_ctrl.AwsCloudWatchLogsDatasourceQueryCtrl;
    }, function (_annotations_query_ctrl) {
      AwsCloudWatchLogsAnnotationsQueryCtrl = _annotations_query_ctrl.AwsCloudWatchLogsAnnotationsQueryCtrl;
    }, function (_config_ctrl) {
      AwsCloudWatchLogsDatasourceConfigCtrl = _config_ctrl.AwsCloudWatchLogsDatasourceConfigCtrl;
    }],
    execute: function () {
      _export('Datasource', AwsCloudWatchLogsDatasource);

      _export('QueryCtrl', AwsCloudWatchLogsDatasourceQueryCtrl);

      _export('ConfigCtrl', AwsCloudWatchLogsDatasourceConfigCtrl);

      _export('AnnotationsQueryCtrl', AwsCloudWatchLogsAnnotationsQueryCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
