'use strict';

System.register(['lodash'], function (_export, _context) {
  "use strict";

  var _, _createClass, AwsCloudWatchLogsDatasourceConfigCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('AwsCloudWatchLogsDatasourceConfigCtrl', AwsCloudWatchLogsDatasourceConfigCtrl = function () {
        /** @ngInject */
        function AwsCloudWatchLogsDatasourceConfigCtrl($scope, datasourceSrv) {
          _classCallCheck(this, AwsCloudWatchLogsDatasourceConfigCtrl);

          this.current.jsonData.authType = this.current.jsonData.authType || 'credentials';

          this.accessKeyExist = this.current.secureJsonFields.accessKey;
          this.secretKeyExist = this.current.secureJsonFields.secretKey;
          this.datasourceSrv = datasourceSrv;
          this.authTypes = [{ name: 'Access & secret key', value: 'keys' }, { name: 'Credentials file', value: 'credentials' }, { name: 'ARN', value: 'arn' }];
        }

        _createClass(AwsCloudWatchLogsDatasourceConfigCtrl, [{
          key: 'resetAccessKey',
          value: function resetAccessKey() {
            this.accessKeyExist = false;
          }
        }, {
          key: 'resetSecretKey',
          value: function resetSecretKey() {
            this.secretKeyExist = false;
          }
        }]);

        return AwsCloudWatchLogsDatasourceConfigCtrl;
      }());

      _export('AwsCloudWatchLogsDatasourceConfigCtrl', AwsCloudWatchLogsDatasourceConfigCtrl);

      AwsCloudWatchLogsDatasourceConfigCtrl.templateUrl = 'partials/config.html';
    }
  };
});
//# sourceMappingURL=config_ctrl.js.map
