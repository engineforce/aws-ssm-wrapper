module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 2 */
/*!********************************!*\
  !*** external "lodash/filter" ***!
  \********************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("lodash/filter");

/***/ }),
/* 3 */
/*!*****************************************!*\
  !*** ./node_modules/async-lib/index.js ***!
  \*****************************************/
/*! no static exports found */
/*! exports used: asyncMap */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    parallel: __webpack_require__(/*! ./parallel */ 5),
    serial: __webpack_require__(/*! ./serial */ 6),
    queue: __webpack_require__(/*! ./queue */ 7)
};


/***/ }),
/* 4 */
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/paul.li/my/git/engineforce/libs/packages/aws-ssm-wrapper/index.js */8);


/***/ }),
/* 5 */
/*!********************************************!*\
  !*** ./node_modules/async-lib/parallel.js ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function parallel(producers, collect) {
    var isArray = Array.isArray(producers);
    var result = isArray ? [] : {};
    var keys = Object.keys(producers);
    var pending = keys.length;
    var hasCollect = typeof collect === 'function';
    var producer;
    keys.forEach(function (key) {
        producer = producers[key];
        if (typeof producer === 'function') {
            producer(function (val) {
                if (!result.hasOwnProperty(key)) {
                    pending -= 1;
                    result[key] = val;
                    if (hasCollect && pending === 0) {
                        collect(result);
                    }
                }
            }, result, pending, isArray ? +key : key);
        } else {
            result[key] = producer;
            pending -= 1;
            if (hasCollect && pending === 0) {
                collect(result);
            }
        }
    });
}

module.exports = parallel;


/***/ }),
/* 6 */
/*!******************************************!*\
  !*** ./node_modules/async-lib/serial.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function next(producers, result, pending, index) {
    var producer;
    if (pending === 0) {
        return result;
    } else {
        producer = producers[index];
        if (typeof producer === 'function') {
            producer(function (val) {
                if (!result.hasOwnProperty(index)) {
                    result[index] = val;
                    next(producers, result, pending -= 1, index += 1);
                }
            }, result, pending, index);
        } else {
            result[index] = producer;
            next(producers, result, pending -= 1, index += 1);
        }
        return result; // not reachable
    }
}

function serial(producers, collect) {
    var result = next(producers, [], producers.length, 0);
    if (typeof collect === 'function') { collect(result); }
}

module.exports = serial;


/***/ }),
/* 7 */
/*!*****************************************!*\
  !*** ./node_modules/async-lib/queue.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = Array.prototype.slice;

function NONE() {}

module.exports = function (/*listeners*/) {
    var pending = slice.call(arguments);
    var value;

    function set(val) {
        var newVal, caller;
        value = val;
        if (pending.length > 0) {
            newVal = pending[0];
            if (typeof newVal === 'function') {
                caller = newVal;
                newVal = newVal(value, function (val) {
                    if (caller === pending[0]) {
                        if (arguments.length > 0) {
                            value = val;
                        }
                        pending.shift();
                        set(value);
                    }
                }, NONE);
                if (newVal === undefined) {
                    return;
                } else if (newVal === NONE) {
                    newVal = undefined;
                }
            }
            pending.shift();
            set(newVal);
        }
    }

    function add(/*listeners*/) {
        var isSettled;
        if (arguments.length > 0) {
            isSettled = pending.length < 1;
            pending.push.apply(pending, slice.call(arguments));
            if (isSettled) {
                set(value);
            }
        }
        return add;
    }

    if (pending.length > 0) {
        set(value);
    }
    return add;
};


/***/ }),
/* 8 */
/*!******************************!*\
  !*** ./index.js + 2 modules ***!
  \******************************/
/*! exports provided: findParameters, putParameters, loadPutParameters, loadFindParameters */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/async-lib/index.js (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "aws-sdk" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "lodash" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "lodash/filter" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "aws-sdk"
var external_aws_sdk_ = __webpack_require__(1);
var external_aws_sdk_default = /*#__PURE__*/__webpack_require__.n(external_aws_sdk_);

// EXTERNAL MODULE: external "lodash/filter"
var filter_ = __webpack_require__(2);
var filter_default = /*#__PURE__*/__webpack_require__.n(filter_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(0);
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_);

// CONCATENATED MODULE: ./src/findParameters.js


function loadFindParameters(options) {
  return async function (parameterNames) {
    let parameterMetaInfos = await _findParameterMetaInfos(options, parameterNames);
    return _getParameters(options, parameterMetaInfos.map(meta => meta.Name));
  };
}

async function _findParameterMetaInfos(options, parameterNames, nextToken) {
  let result = await options.ssm.describeParameters({
    NextToken: nextToken
  }).promise();
  let parameters = result.Parameters;

  if (parameterNames) {
    parameters = filter_default()(parameters, parameter => parameterNames.includes(parameter.Name));
  }

  if (result.NextToken) {
    parameters = [...parameters, ...(await _findParameterMetaInfos(options, parameterNames, result.NextToken))];
  }

  return parameters;
} // AWS Constraint: Member must have length less than or equal to 10


const MAX_PARAMETERS = 10;

async function _getParameters(options, names) {
  var namesToTake = external_lodash_default.a.take(names, MAX_PARAMETERS);

  var namesRemaining = external_lodash_default.a.takeRight(names, names.length - MAX_PARAMETERS);

  let result = await options.ssm.getParameters({
    Names: namesToTake,
    WithDecryption: true
  }).promise();
  let parameters = result.Parameters;

  if (namesRemaining.length > 0) {
    parameters = [...parameters, ...(await _getParameters(options, namesRemaining))];
  }

  return parameters;
}
// EXTERNAL MODULE: ./node_modules/async-lib/index.js
var async_lib = __webpack_require__(3);

// CONCATENATED MODULE: ./src/putParameters.js


function loadPutParameters(options) {
  return async function (input) {
    return _putParameters(options, input);
  };
} // AWS Constraint: Member must have length less than or equal to 10

async function _putParameters(options, input) {
  const oldParameters = external_lodash_default.a.keyBy((await options.findParameters(input.parameters.map(p => p.key))), 'Name');

  await Object(async_lib["asyncMap"])(input.parameters, async parameter => {
    const oldParameter = oldParameters[parameter.key];

    if (oldParameter == undefined || oldParameter.Value !== parameter.value) {
      console.log('Update parameter:', external_lodash_default.a.extend({}, parameter, {
        oldValue: oldParameter ? oldParameter.Value : undefined
      }));

      if (!input.dryRun) {
        if (parameter.value != undefined) {
          return await options.ssm.putParameter({
            Name: parameter.key,
            Type: parameter.type,
            Value: parameter.value,
            KeyId: input.kmsKeyId,
            Overwrite: true,
            Description: parameter.description
          }).promise();
        } else if (oldParameter != undefined) {
          await options.ssm.deleteParameter({
            Name: parameter.key
          }).promise();
        }
      }
    }

    return undefined;
  });
}
// CONCATENATED MODULE: ./index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findParameters", function() { return findParameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putParameters", function() { return putParameters; });
/* concated harmony reexport loadPutParameters */__webpack_require__.d(__webpack_exports__, "loadPutParameters", function() { return loadPutParameters; });
/* concated harmony reexport loadFindParameters */__webpack_require__.d(__webpack_exports__, "loadFindParameters", function() { return loadFindParameters; });



const ssm = new external_aws_sdk_default.a.SSM({
  region: process.env.AWS_DEFAULT_REGION
});
const findParameters = loadFindParameters({
  ssm
});
const putParameters = loadPutParameters({
  ssm,
  findParameters
});



/***/ })
/******/ ]);