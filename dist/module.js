define(["app/core/table_model","app/core/utils/flatten","app/plugins/sdk","lodash"], function(__WEBPACK_EXTERNAL_MODULE_grafana_app_core_table_model__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_flatten__, __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__, __WEBPACK_EXTERNAL_MODULE_lodash__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./annotations_query_ctrl.ts":
/*!***********************************!*\
  !*** ./annotations_query_ctrl.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var AwsCloudWatchLogsAnnotationsQueryCtrl =
/** @class */
function () {
  function AwsCloudWatchLogsAnnotationsQueryCtrl($scope, $injector) {
    this.scope = $scope;
  }

  AwsCloudWatchLogsAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
  return AwsCloudWatchLogsAnnotationsQueryCtrl;
}();

exports.AwsCloudWatchLogsAnnotationsQueryCtrl = AwsCloudWatchLogsAnnotationsQueryCtrl;

/***/ }),

/***/ "./config_ctrl.ts":
/*!************************!*\
  !*** ./config_ctrl.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var AwsCloudWatchLogsDatasourceConfigCtrl =
/** @class */
function () {
  /** @ngInject */
  AwsCloudWatchLogsDatasourceConfigCtrl.$inject = ["$scope", "datasourceSrv"];
  function AwsCloudWatchLogsDatasourceConfigCtrl($scope, datasourceSrv) {
    this.current.jsonData.authType = this.current.jsonData.authType || 'credentials';
    this.accessKeyExist = this.current.secureJsonFields.accessKey;
    this.secretKeyExist = this.current.secureJsonFields.secretKey;
    this.datasourceSrv = datasourceSrv;
    this.authTypes = [{
      name: 'Access & secret key',
      value: 'keys'
    }, {
      name: 'Credentials file',
      value: 'credentials'
    }, {
      name: 'ARN',
      value: 'arn'
    }];
  }

  AwsCloudWatchLogsDatasourceConfigCtrl.prototype.resetAccessKey = function () {
    this.accessKeyExist = false;
  };

  AwsCloudWatchLogsDatasourceConfigCtrl.prototype.resetSecretKey = function () {
    this.secretKeyExist = false;
  };

  AwsCloudWatchLogsDatasourceConfigCtrl.templateUrl = 'partials/config.html';
  return AwsCloudWatchLogsDatasourceConfigCtrl;
}();

exports.AwsCloudWatchLogsDatasourceConfigCtrl = AwsCloudWatchLogsDatasourceConfigCtrl;

/***/ }),

/***/ "./datasource.ts":
/*!***********************!*\
  !*** ./datasource.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AwsCloudWatchLogsDatasource = undefined;

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _table_model = __webpack_require__(/*! grafana/app/core/table_model */ "grafana/app/core/table_model");

var _table_model2 = _interopRequireDefault(_table_model);

var _flatten = __webpack_require__(/*! grafana/app/core/utils/flatten */ "grafana/app/core/utils/flatten");

var _flatten2 = _interopRequireDefault(_flatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AwsCloudWatchLogsDatasource =
/** @class */
function () {
  function AwsCloudWatchLogsDatasource(instanceSettings, $q, backendSrv, templateSrv, timeSrv) {
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

  AwsCloudWatchLogsDatasource.prototype.query = function (options) {
    var query = this.buildQueryParameters(options);
    query.targets = query.targets.filter(function (t) {
      return !t.hide;
    });

    if (query.targets.length <= 0) {
      return this.q.when({
        data: []
      });
    }

    return this.doRequest({
      data: query
    });
  };

  AwsCloudWatchLogsDatasource.prototype.testDatasource = function () {
    var _this = this;

    return this.doMetricQueryRequest('log_group_names', {
      region: this.defaultRegion,
      logGroupNamePrefix: 'test'
    }).then(function (res) {
      return _this.q.when({
        status: "success",
        message: "Data source is working",
        title: "Success"
      });
    }).catch(function (err) {
      return {
        status: "error",
        message: err.message,
        title: "Error"
      };
    });
  };

  AwsCloudWatchLogsDatasource.prototype.doRequest = function (options) {
    var _this = this;

    return this.backendSrv.datasourceRequest({
      url: '/api/tsdb/query',
      method: 'POST',
      data: {
        from: options.data.range.from.valueOf().toString(),
        to: options.data.range.to.valueOf().toString(),
        queries: options.data.targets
      }
    }).then(function (result) {
      var res = [];

      _lodash2.default.forEach(result.data.results, function (r) {
        if (!_lodash2.default.isEmpty(r.series)) {
          _lodash2.default.forEach(r.series, function (s) {
            res.push({
              target: s.name,
              datapoints: s.points
            });
          });
        }

        if (!_lodash2.default.isEmpty(r.tables)) {
          _lodash2.default.forEach(r.tables, function (t) {
            res.push(_this.expandMessageField(t));
          });
        }
      });

      result.data = res;
      return result;
    });
  };

  AwsCloudWatchLogsDatasource.prototype.buildQueryParameters = function (options) {
    var _this = this;

    var targets = _lodash2.default.map(options.targets, function (target) {
      var input = {
        logGroupName: _this.templateSrv.replace(target.logGroupName, options.scopedVars),
        logStreamNames: target.logStreamNames.filter(function (n) {
          return n !== "";
        }).map(function (n) {
          return _this.templateSrv.replace(n, options.scopedVars);
        }),
        filterPattern: _this.templateSrv.replace(target.filterPattern, options.scopedVars),
        interleaved: false
      };

      if (input.logStreamNames.length === 0) {
        delete input.logStreamNames;
      }

      return {
        refId: target.refId,
        hide: target.hide,
        datasourceId: _this.id,
        queryType: 'timeSeriesQuery',
        format: target.type || 'timeserie',
        region: _this.templateSrv.replace(target.region, options.scopedVars) || _this.defaultRegion,
        input: input
      };
    });

    options.targets = targets;
    return options;
  };

  AwsCloudWatchLogsDatasource.prototype.expandMessageField = function (originalTable) {
    var table = new _table_model2.default();
    var i, j;
    var metricLabels = {};

    if (originalTable.rows.length === 0) {
      return table;
    }

    table.columns = originalTable.columns; // Collect all labels across all metrics

    var messageIndex = table.columns.findIndex(function (c) {
      return c.text === 'Message';
    });
    var messages = originalTable.rows.map(function (r) {
      var messageJson = {};

      try {
        if (r[messageIndex][0] === '{') {
          messageJson = JSON.parse(r[messageIndex]);
        }
      } catch (err) {// ignore error
      }

      return messageJson;
    });

    _lodash2.default.each(messages.slice(0, 100), function (message) {
      var flattened = (0, _flatten2.default)(message, null);

      for (var propName in flattened) {
        metricLabels[propName] = 1;
      }
    }); // Sort metric labels, create columns for them and record their index


    var sortedLabels = _lodash2.default.keys(metricLabels).sort();

    _lodash2.default.each(sortedLabels, function (label, labelIndex) {
      metricLabels[label] = labelIndex + 1;
      table.columns.push({
        text: label
      });
    }); // Populate rows, set value to empty string when label not present.


    for (i = 0; i < originalTable.rows.length; i++) {
      var reordered = originalTable.rows[i];
      var message = messages[i];

      for (j = 0; j < sortedLabels.length; j++) {
        var label = sortedLabels[j];
        reordered.push(_lodash2.default.get(message, label) || '');
      }

      table.rows.push(reordered);
    }

    return table;
  };

  AwsCloudWatchLogsDatasource.prototype.metricFindQuery = function (query) {
    var region;
    var logGroupNamesQuery = query.match(/^log_group_names\(([^,]+?),\s?(.+)\)/);

    if (logGroupNamesQuery) {
      region = logGroupNamesQuery[1];
      var prefix = logGroupNamesQuery[2];
      return this.doMetricQueryRequest('log_group_names', {
        region: this.templateSrv.replace(region),
        logGroupNamePrefix: this.templateSrv.replace(prefix)
      });
    }

    var logStreamNamesQuery = query.match(/^log_stream_names\(([^,]+?),\s?(.+)\)/);

    if (logStreamNamesQuery) {
      region = logStreamNamesQuery[1];
      var logGroupName = logStreamNamesQuery[2];
      return this.doMetricQueryRequest('log_stream_names', {
        region: this.templateSrv.replace(region),
        logGroupName: this.templateSrv.replace(logGroupName),
        logStreamNamePrefix: ""
      });
    }

    return this.$q.when([]);
  };

  AwsCloudWatchLogsDatasource.prototype.doMetricQueryRequest = function (subtype, parameters) {
    var _this = this;

    var range = this.timeSrv.timeRange();
    return this.backendSrv.datasourceRequest({
      url: '/api/tsdb/query',
      method: 'POST',
      data: {
        from: range.from.valueOf().toString(),
        to: range.to.valueOf().toString(),
        queries: [_lodash2.default.extend({
          refId: 'metricFindQuery',
          datasourceId: this.id,
          queryType: 'metricFindQuery',
          subtype: subtype
        }, parameters)]
      }
    }).then(function (r) {
      return _this.transformSuggestDataFromTable(r.data);
    });
  };

  AwsCloudWatchLogsDatasource.prototype.transformSuggestDataFromTable = function (suggestData) {
    return _lodash2.default.map(suggestData.results['metricFindQuery'].tables[0].rows, function (v) {
      return {
        text: v[0],
        value: v[1]
      };
    });
  };

  AwsCloudWatchLogsDatasource.prototype.annotationQuery = function (options) {
    var _this = this;

    var annotation = options.annotation;
    var region = annotation.region || this.defaultRegion;
    var logGroupName = annotation.logGroupName || '';
    var filterPattern = annotation.filterPattern || '';
    var tagKeys = annotation.tagKeys || '';
    tagKeys = tagKeys.split(',');
    var titleFormat = annotation.titleFormat || '';
    var textFormat = annotation.textFormat || '';

    if (_lodash2.default.isEmpty(region) || _lodash2.default.isEmpty(logGroupName)) {
      return Promise.resolve([]);
    }

    var range = this.timeSrv.timeRange();
    return this.backendSrv.datasourceRequest({
      url: '/api/tsdb/query',
      method: 'POST',
      data: {
        from: range.from.valueOf().toString(),
        to: range.to.valueOf().toString(),
        queries: [{
          refId: 'annotationQuery',
          datasourceId: this.id,
          queryType: 'annotationQuery',
          region: this.templateSrv.replace(region),
          input: {
            logGroupName: this.templateSrv.replace(logGroupName),
            filterPattern: this.templateSrv.replace(filterPattern),
            interleaved: false
          }
        }]
      }
    }).then(function (r) {
      if (!r.data.results[""].meta.Events) {
        return [];
      }

      var eventList = r.data.results[""].meta.Events.map(function (event) {
        var messageJson = JSON.parse(event.Message);

        var tags = _lodash2.default.chain(messageJson).filter(function (v, k) {
          return _lodash2.default.includes(tagKeys, k);
        }).value();

        return {
          annotation: annotation,
          time: event.Timestamp,
          title: _this.renderTemplate(titleFormat, messageJson),
          tags: tags,
          text: _this.renderTemplate(textFormat, messageJson)
        };
      });
      return eventList;
    });
  };

  AwsCloudWatchLogsDatasource.prototype.renderTemplate = function (aliasPattern, aliasData) {
    var aliasRegex = /\{\{\s*(.+?)\s*\}\}/g;
    return aliasPattern.replace(aliasRegex, function (match, g1) {
      if (aliasData[g1]) {
        return aliasData[g1];
      }

      return g1;
    });
  };

  return AwsCloudWatchLogsDatasource;
}();

exports.AwsCloudWatchLogsDatasource = AwsCloudWatchLogsDatasource;

/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationsQueryCtrl = exports.ConfigCtrl = exports.QueryCtrl = exports.Datasource = undefined;

var _datasource = __webpack_require__(/*! ./datasource */ "./datasource.ts");

var _query_ctrl = __webpack_require__(/*! ./query_ctrl */ "./query_ctrl.ts");

var _annotations_query_ctrl = __webpack_require__(/*! ./annotations_query_ctrl */ "./annotations_query_ctrl.ts");

var _config_ctrl = __webpack_require__(/*! ./config_ctrl */ "./config_ctrl.ts");

exports.Datasource = _datasource.AwsCloudWatchLogsDatasource;
exports.QueryCtrl = _query_ctrl.AwsCloudWatchLogsDatasourceQueryCtrl;
exports.ConfigCtrl = _config_ctrl.AwsCloudWatchLogsDatasourceConfigCtrl;
exports.AnnotationsQueryCtrl = _annotations_query_ctrl.AwsCloudWatchLogsAnnotationsQueryCtrl;

/***/ }),

/***/ "./query_ctrl.ts":
/*!***********************!*\
  !*** ./query_ctrl.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AwsCloudWatchLogsDatasourceQueryCtrl = undefined;

var _sdk = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");

var __extends = undefined && undefined.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var AwsCloudWatchLogsDatasourceQueryCtrl =
/** @class */
function (_super) {
  __extends(AwsCloudWatchLogsDatasourceQueryCtrl, _super);

  function AwsCloudWatchLogsDatasourceQueryCtrl($scope, $injector, templateSrv) {
    var _this = _super.call(this, $scope, $injector) || this;

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

  AwsCloudWatchLogsDatasourceQueryCtrl.prototype.onChangeInternal = function () {
    this.panelCtrl.refresh();
  };

  AwsCloudWatchLogsDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
  return AwsCloudWatchLogsDatasourceQueryCtrl;
}(_sdk.QueryCtrl);

exports.AwsCloudWatchLogsDatasourceQueryCtrl = AwsCloudWatchLogsDatasourceQueryCtrl;

/***/ }),

/***/ "grafana/app/core/table_model":
/*!***************************************!*\
  !*** external "app/core/table_model" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_table_model__;

/***/ }),

/***/ "grafana/app/core/utils/flatten":
/*!*****************************************!*\
  !*** external "app/core/utils/flatten" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_flatten__;

/***/ }),

/***/ "grafana/app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map