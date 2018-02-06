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

/**
* A system of checking those authorized to changes labels and
* thereby point values and authorizing of issue closing and payment.
 * @summary http ⇒ λ github-issue ⇒ mutliple conditional requests
 * @external authLabelClose ? handleLabelClose() : authLabelClose ? pay(assignee) : reopen()
 * @param { String }  assignee -  JSON.parse(event.body).issue
 * @param { Object }  Item -  JSON.parse(event.body)
 * @param { Number }  number -  JSON.parse(event.body).issue
 */

// deps
const { request } = __webpack_require__(1);
const { DynamoDB: { DocumentClient } } = __webpack_require__(2);

// consts
const { NODE_ENV, ghAccessToken } = process.env;
const PM = 'TA-Bot';
// const DOLLARS_PER_POINT = 0.01

// db Config
const docClient = new DocumentClient(NODE_ENV === 'local' ? { region: 'us-east-1', endpoint: 'http://localhost:8000' } : null);

// request helper
const asyncRequest = (path, method = 'get', writeBody) => new Promise((resolve, reject) => {

  const options = {
    headers: {
      'User-Agent': 'crowdpay',
      auth: `wordyallen:${ghAccessToken}`
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

// main funcs
const saveIssue = (Item, cb) => {
  // console.log('--saving')
  docClient.put({
    TableName: 'issue-crowdpay-dev',
    ReturnValues: 'ALL_OLD',
    Item
  }).promise().then(() => cb(null, { statusCode: 200 })).catch(err => cb(err));
};

const patchIssue = (() => {
  var _ref = _asyncToGenerator(function* (number, cb) {

    const { Item: { issue: { labels } } } = yield docClient.get({
      TableName: 'issue-crowdpay-dev',
      Key: { number }
    }).promise();

    const { err, data: { statusCode } } = yield asyncRequest(`/repos/iot-course/org/issues/${number}`, 'patch', { labels });

    statusCode ? cb(null, { statusCode }) : cb(err);
  });

  return function patchIssue(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const reopen = cb => {
  console.log('reopen-----');
  cb();
};

const pay = (() => {
  var _ref2 = _asyncToGenerator(function* (assignee, cb) {

    const { err, data: { email, statusCode } } = yield asyncRequest(`/users/${assignee}`);
    email ? cb(null, { statusCode }) : cb(err);
  });

  return function pay(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

const checkCommitStatus = (() => {
  var _ref3 = _asyncToGenerator(function* () {

    // const { err, data} = await asyncRequest(
    //   `/repos/iot-course/org/commits/check-changes-of-commit/statuses`
    // )
    // console.log(data[2], '----data')
    return false;
  });

  return function checkCommitStatus() {
    return _ref3.apply(this, arguments);
  };
})();

// call compare commits https://developer.github.com/v3/repos/commits/#compare-two-commits
// const [err, { total }] = await asyncRequest(`some'. github path`)
const checkPointsToStats = points => {

  console.log(`checking points to stats: ${points}---`);
  return false;
};

exports.handler = (() => {
  var _ref4 = _asyncToGenerator(function* (e, _, cb) {

    const { sender: { login }, issue: { number, labels, assignee, title: feature }, action } = JSON.parse(e.body);
    const Item = { number, action, issue: { number, labels }, sender: { login } };
    const [{ name: points }] = labels;

    const labelChange = action === 'labeled' || action === 'unlabeled' || action === 'edited';
    const authLabelChange = labels.length === 1 && login === PM;
    const authLabelClose = action === 'closed' && assignee === login && checkCommitStatus() && checkPointsToStats(+points);

    labelChange ? authLabelChange ? saveIssue(Item, cb) : patchIssue(number, cb) : authLabelClose ? pay(assignee, cb) : reopen(cb);
  });

  return function (_x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
})();

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