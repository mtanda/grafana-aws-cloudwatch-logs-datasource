'use strict';

System.register(['app/plugins/sdk'], function (_export, _context) {
  "use strict";

  var QueryCtrl, _createClass, AwsCloudWatchLogsDatasourceQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      QueryCtrl = _appPluginsSdk.QueryCtrl;
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

      _export('AwsCloudWatchLogsDatasourceQueryCtrl', AwsCloudWatchLogsDatasourceQueryCtrl = function (_QueryCtrl) {
        _inherits(AwsCloudWatchLogsDatasourceQueryCtrl, _QueryCtrl);

        function AwsCloudWatchLogsDatasourceQueryCtrl($scope, $injector, templateSrv) {
          _classCallCheck(this, AwsCloudWatchLogsDatasourceQueryCtrl);

          var _this = _possibleConstructorReturn(this, (AwsCloudWatchLogsDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(AwsCloudWatchLogsDatasourceQueryCtrl)).call(this, $scope, $injector));

          _this.scope = $scope;
          _this.target.type = _this.target.type || 'timeserie';
          _this.target.region = _this.target.region || '';
          _this.target.logGroupName = _this.target.logGroupName || '';
          _this.target.logStreamNames = _this.target.logStreamNames || [];
          _this.target.filterPattern = _this.target.filterPattern || '';
          _this.templateSrv = templateSrv;

          _this.suggestLogGroupName = function (query, callback) {
            var region = _this.target.region || _this.defaultRegion;
            return _this.datasource.doMetricQueryRequest('log_group_names', {
              region: _this.templateSrv.replace(region),
              logGroupNamePrefix: query
            }).then(function (data) {
              callback(data.map(function (d) {
                return d.value;
              }));
            });
          };

          _this.suggestLogStreamName = function (query, callback) {
            if (!_this.target.logGroupName) {
              return callback([]);
            }
            var region = _this.target.region || _this.defaultRegion;
            return _this.datasource.doMetricQueryRequest('log_stream_names', {
              region: _this.templateSrv.replace(region),
              logGroupName: _this.target.logGroupName,
              logStreamNamePrefix: query
            }).then(function (data) {
              callback(data.map(function (d) {
                return d.value;
              }));
            });
          };
          return _this;
        }

        _createClass(AwsCloudWatchLogsDatasourceQueryCtrl, [{
          key: 'onChangeInternal',
          value: function onChangeInternal() {
            this.panelCtrl.refresh();
          }
        }]);

        return AwsCloudWatchLogsDatasourceQueryCtrl;
      }(QueryCtrl));

      _export('AwsCloudWatchLogsDatasourceQueryCtrl', AwsCloudWatchLogsDatasourceQueryCtrl);

      AwsCloudWatchLogsDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
    }
  };
});
//# sourceMappingURL=query_ctrl.js.map
