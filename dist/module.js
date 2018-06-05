'use strict';

System.register(['./datasource', './query_ctrl', './annotations_query_ctrl'], function (_export, _context) {
  "use strict";

  var AwsCloudWatchLogsDatasource, AwsCloudWatchLogsDatasourceQueryCtrl, AwsCloudWatchLogsAnnotationsQueryCtrl, AwsCloudWatchLogsDatasourceConfigCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_datasource) {
      AwsCloudWatchLogsDatasource = _datasource.AwsCloudWatchLogsDatasource;
    }, function (_query_ctrl) {
      AwsCloudWatchLogsDatasourceQueryCtrl = _query_ctrl.AwsCloudWatchLogsDatasourceQueryCtrl;
    }, function (_annotations_query_ctrl) {
      AwsCloudWatchLogsAnnotationsQueryCtrl = _annotations_query_ctrl.AwsCloudWatchLogsAnnotationsQueryCtrl;
    }],
    execute: function () {
      _export('ConfigCtrl', AwsCloudWatchLogsDatasourceConfigCtrl = function AwsCloudWatchLogsDatasourceConfigCtrl() {
        _classCallCheck(this, AwsCloudWatchLogsDatasourceConfigCtrl);
      });

      AwsCloudWatchLogsDatasourceConfigCtrl.templateUrl = 'partials/config.html';

      _export('Datasource', AwsCloudWatchLogsDatasource);

      _export('QueryCtrl', AwsCloudWatchLogsDatasourceQueryCtrl);

      _export('ConfigCtrl', AwsCloudWatchLogsDatasourceConfigCtrl);

      _export('AnnotationsQueryCtrl', AwsCloudWatchLogsAnnotationsQueryCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
