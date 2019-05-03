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

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

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
    return __awaiter(this, void 0, void 0, function () {
      var query;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            query = this.buildQueryParameters(options);
            query.targets = query.targets.filter(function (t) {
              return !t.hide;
            });

            if (query.targets.length <= 0) {
              return [2
              /*return*/
              , this.q.when({
                data: []
              })];
            }

            return [4
            /*yield*/
            , this.doRequest({
              data: query
            })];

          case 1:
            return [2
            /*return*/
            , _a.sent()];
        }
      });
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
    return __awaiter(this, void 0, void 0, function () {
      var results, resultsMap, res, _i, _a, target, r;

      var _this = this;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , Promise.all(options.data.targets.map(function (target) {
              return __awaiter(_this, void 0, void 0, function () {
                var startResult, queryId, queryResult, i, status_1;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (!!target.useInsights) return [3
                      /*break*/
                      , 2];
                      return [4
                      /*yield*/
                      , this.backendSrv.datasourceRequest({
                        url: '/api/tsdb/query',
                        method: 'POST',
                        data: {
                          from: options.data.range.from.valueOf().toString(),
                          to: options.data.range.to.valueOf().toString(),
                          queries: [target]
                        }
                      })];

                    case 1:
                      return [2
                      /*return*/
                      , _a.sent()];

                    case 2:
                      return [4
                      /*yield*/
                      , this.backendSrv.datasourceRequest({
                        url: '/api/tsdb/query',
                        method: 'POST',
                        data: {
                          from: options.data.range.from.valueOf().toString(),
                          to: options.data.range.to.valueOf().toString(),
                          queries: [target]
                        }
                      })];

                    case 3:
                      startResult = _a.sent();
                      queryId = startResult.data.results[target.refId].meta.QueryId;
                      target.queryId = queryId;
                      queryResult = void 0;
                      i = 0;
                      _a.label = 4;

                    case 4:
                      if (!(i < 60)) return [3
                      /*break*/
                      , 10];
                      return [4
                      /*yield*/
                      , this.backendSrv.datasourceRequest({
                        url: '/api/tsdb/query',
                        method: 'POST',
                        data: {
                          from: options.data.range.from.valueOf().toString(),
                          to: options.data.range.to.valueOf().toString(),
                          queries: [target]
                        }
                      })];

                    case 5:
                      queryResult = _a.sent();
                      status_1 = queryResult.data.results[target.refId].meta.Status;
                      if (!(status_1 === 'Complete')) return [3
                      /*break*/
                      , 6];
                      return [3
                      /*break*/
                      , 10];

                    case 6:
                      if (!_lodash2.default.includes(['Failed', 'Cancelled'], status_1)) return [3
                      /*break*/
                      , 7];
                      throw 'insights query failed';

                    case 7:
                      return [4
                      /*yield*/
                      , this.delay(1000)];

                    case 8:
                      _a.sent();

                      return [3
                      /*break*/
                      , 9];
                    // in progress

                    case 9:
                      i++;
                      return [3
                      /*break*/
                      , 4];

                    case 10:
                      return [2
                      /*return*/
                      , queryResult];
                  }
                });
              });
            }))];

          case 1:
            results = _b.sent();
            resultsMap = {};

            _lodash2.default.each(results, function (result) {
              _lodash2.default.each(result.data.results, function (r) {
                resultsMap[r.refId] = r;
              });
            });

            res = [];

            for (_i = 0, _a = options.data.targets; _i < _a.length; _i++) {
              target = _a[_i];
              r = resultsMap[target.refId];

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
            }

            return [2
            /*return*/
            , {
              data: res
            }];
        }
      });
    });
  };

  AwsCloudWatchLogsDatasource.prototype.delay = function (msec) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, msec);
    });
  };

  AwsCloudWatchLogsDatasource.prototype.buildQueryParameters = function (options) {
    var _this = this;

    var targets = _lodash2.default.map(options.targets, function (target) {
      var input = {};
      var inputInsightsStartQuery = {};

      if (!target.useInsights) {
        var scVars = target.logStreamNames.filter(function (n) {
          return n !== "";
        }).map(function (n) {
          return _this.templateSrv.replace(n, options.scopedVars);
        });
        scVars = scVars[0].replace(/{|}/g, '').split(",");
        input = {
          logGroupName: _this.templateSrv.replace(target.logGroupName, options.scopedVars),
          logStreamNames: scVars,
          filterPattern: _this.templateSrv.replace(target.filterPattern, options.scopedVars),
          limit: target.limit,
          interleaved: false
        };

        if (input.logStreamNames.length === 0) {
          delete input.logStreamNames;
        }
      } else {
        inputInsightsStartQuery = {
          logGroupName: _this.templateSrv.replace(target.logGroupName, options.scopedVars),
          queryString: _this.templateSrv.replace(target.queryString, options.scopedVars),
          limit: target.limit
        };
      }

      return {
        refId: target.refId,
        hide: target.hide,
        datasourceId: _this.id,
        queryType: 'timeSeriesQuery',
        format: target.format || 'timeserie',
        region: _this.templateSrv.replace(target.region, options.scopedVars) || _this.defaultRegion,
        useInsights: target.useInsights,
        legendFormat: target.legendFormat,
        timestampColumn: target.timestampColumn,
        valueColumn: target.valueColumn,
        input: input,
        inputInsightsStartQuery: inputInsightsStartQuery
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
    _this.target.format = _this.target.format || 'table';
    _this.target.region = _this.target.region || '';
    _this.target.logGroupName = _this.target.logGroupName || '';
    _this.target.logStreamNames = _this.target.logStreamNames || [];
    _this.target.filterPattern = _this.target.filterPattern || '';
    _this.target.queryString = _this.target.queryString || '';
    _this.target.limit = _this.target.limit || 10000;
    _this.target.legendFormat = _this.target.legendFormat || '';
    _this.target.timestampColumn = _this.target.timestampColumn || '';
    _this.target.valueColumn = _this.target.valueColumn || '';
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