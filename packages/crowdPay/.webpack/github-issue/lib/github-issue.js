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

/**
* Authorizes github point/label changes and reverts back if unauthorized
 * @summary http ⇒ λ authorize ⇒ request
 * @external  request(options(ghAccessToken, number),...)
 * @param { String }  action -  JSON.parse(event.body)
 * @param { String }  login -  JSON.parse(event.body).sender
 * @param { Number }  number -  JSON.parse(event.body).issue
 * @param { Array }  labels -  JSON.parse(event.body).issue
 * @arg { Array }  ghAccessToken -  process.env
 */

const { request } = __webpack_require__(1);
const { DynamoDB: { DocumentClient } } = __webpack_require__(2);

const { NODE_ENV, ghAccessToken } = process.env;
const PM = 'TA-Bot';
// const DOLLARS_PER_POINT = 0.01


const docClient = new DocumentClient(NODE_ENV === 'local' ? { region: 'us-east-1', endpoint: 'http://localhost:8000' } : null);

exports.handler = (e, _, cb) => {

  const { sender: { login }, issue: { number, labels }, action } = JSON.parse(e.body);
  const Item = { number, action, issue: { number, labels }, sender: { login } };

  labels.length === 1 && login === PM && (action === "labeled" || action === "unlabeled" || action === "edited") ? saveIssue(Item, cb) : patchIssue(number, cb);
};

const saveIssue = (Item, cb) => docClient.put({
  TableName: 'issue-crowd-pay-dev',
  ReturnValues: 'ALL_OLD',
  Item
}).promise().then(data => cb(null, { statusCode: 200 })).catch(err => cb(err));

const patchIssue = (number, cb) => {
  const options = {
    method: 'patch',
    hostname: 'api.github.com',
    path: `/repos/iot-course/org/issues/${number}`,
    headers: {
      'User-Agent': 'Crowd Pay',
      Authorization: `token ${ghAccessToken}`
    }
  };

  const req = request(options, ({ statusCode }) => cb(null, { statusCode }));

  docClient.get({ TableName: 'issue-crowd-pay-dev', Key: {
      number
    } }).promise().then(({
    Item: {
      issue: {
        labels
      }
    }
  }) => {
    req.write(JSON.stringify({ labels }));
    req.end();
  }).catch(err => cb(err));
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ })
/******/ ])));