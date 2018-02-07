(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { asyncRequest } = __webpack_require__(1);

exports.handler = (() => {
  var _ref = _asyncToGenerator(function* (e, _, cb) {

    /* eslint-disable camelcase */
    const {
      action,
      pull_request: {
        head: {
          sha
        },
        additions,
        deletions
      }
    } = JSON.parse(e.body);
    /* eslint-enable */

    const getStatus = (() => {
      var _ref2 = _asyncToGenerator(function* () {
        const { err, data } = yield asyncRequest(`/repos/iot-course/org/statuses/${sha}`);
        console.log(data);
        data ? cb(null, { state: data }) : cb(err);
      });

      return function getStatus() {
        return _ref2.apply(this, arguments);
      };
    })();

    setTimeout(getStatus, 2000);
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

//{"title":"Some breaking feature","head":"check-changes-of-commit","base":"master", "body":"close #1"}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const { request } = __webpack_require__(2);

const { ghAccessToken } = process.env;

exports.asyncRequest = (path, method = 'get', writeBody) => new Promise((resolve, reject) => {

  const options = {
    headers: {
      'User-Agent': 'crowdpay',
      auth: `TA-Bot:${ghAccessToken}`,
      Authorization: `token ${ghAccessToken}`
    },
    hostname: 'api.github.com',
    method,
    path
  };

  const req = request(options, res => {
    if (method === 'get') {
      let readBody = '';
      res.on('data', d => readBody += d);
      res.on('end', () => resolve(JSON.parse(readBody)));
      res.on('error', err => reject(err));
    } else {
      resolve(res);
    }
  });
  method !== 'get' && req.write(JSON.stringify(writeBody));
  req.on('error', err => reject(err));
  req.end();
}).then(data => ({ err: null, data })).catch(err => ({ err, data: null }));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ })
/******/ ])));