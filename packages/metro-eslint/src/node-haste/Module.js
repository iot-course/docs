/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @format
 */

'use strict';var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}

const crypto = require('crypto');
const docblock = require('jest-docblock');
const fs = require('fs');
const invariant = require('fbjs/lib/invariant');
const isAbsolutePath = require('absolute-path');
const jsonStableStringify = require('json-stable-stringify');var _require =

require('path');const joinPath = _require.join,relativePath = _require.relative;






























































class Module {

















  constructor(_ref)







  {let depGraphHelpers = _ref.depGraphHelpers,localPath = _ref.localPath,file = _ref.file,getTransformCacheKey = _ref.getTransformCacheKey,moduleCache = _ref.moduleCache,options = _ref.options,transformCode = _ref.transformCode;
    if (!isAbsolutePath(file)) {
      throw new Error('Expected file to be absolute path but got ' + file);
    }

    this.localPath = localPath;
    this.path = file;
    this.type = 'Module';

    this._moduleCache = moduleCache;
    this._transformCode = transformCode;
    this._getTransformCacheKey = getTransformCacheKey;
    this._depGraphHelpers = depGraphHelpers;
    this._options = options || {};

    this._readPromises = new Map();
    this._readResultsByOptionsKey = new Map();
  }

  isHaste() {
    return this._getHasteName() != null;
  }

  getCode(transformOptions) {var _this = this;return _asyncToGenerator(function* () {
      return (yield _this.read(transformOptions)).code;})();
  }

  getMap(transformOptions) {var _this2 = this;return _asyncToGenerator(function* () {
      return (yield _this2.read(transformOptions)).map;})();
  }

  getName() {
    if (this.isHaste()) {
      const name = this._getHasteName();
      if (name != null) {
        return name;
      }
    }

    const p = this.getPackage();

    if (!p) {
      // Name is local path
      return this.localPath;
    }

    const packageName = p.getName();
    if (!packageName) {
      return this.path;
    }

    return joinPath(packageName, relativePath(p.root, this.path)).replace(
    /\\/g,
    '/');

  }

  getPackage() {
    return this._moduleCache.getPackageForModule(this);
  }

  getDependencies(transformOptions) {var _this3 = this;return _asyncToGenerator(function* () {
      return (yield _this3.read(transformOptions)).dependencies;})();
  }

  /**
     * We don't need to invalidate the TranformCache itself because it guarantees
     * itself that if a source code changed we won't return the cached transformed
     * code.
     */
  invalidate() {
    this._readPromises.clear();
    this._readResultsByOptionsKey.clear();
    this._sourceCode = null;
    this._docBlock = null;
    this._hasteNameCache = null;
  }

  _readSourceCode() {
    if (this._sourceCode == null) {
      this._sourceCode = fs.readFileSync(this.path, 'utf8');
    }
    return this._sourceCode;
  }

  _readDocBlock() {
    if (this._docBlock == null) {
      this._docBlock = docblock.parse(docblock.extract(this._readSourceCode()));
    }
    return this._docBlock;
  }

  _getHasteName() {
    if (this._hasteNameCache == null) {
      this._hasteNameCache = { hasteName: this._readHasteName() };
    }
    return this._hasteNameCache.hasteName;
  }

  /**
     * If a custom Haste implementation is provided, then we use it to determine
     * the actual Haste name instead of "@providesModule".
     * `enforceHasteNameMatches` has been added to that it is easier to
     * transition from a system using "@providesModule" to a system using another
     * custom system, by throwing if inconsistencies are detected. For example,
     * we could verify that the file's basename (ex. "bar/foo.js") is the same as
     * the "@providesModule" name (ex. "foo").
     */
  _readHasteName() {
    const hasteImpl = this._options.hasteImpl;
    if (hasteImpl == null) {
      return this._readHasteNameFromDocBlock();
    }const
    enforceHasteNameMatches = hasteImpl.enforceHasteNameMatches;
    if (enforceHasteNameMatches != null) {
      const name = this._readHasteNameFromDocBlock();
      enforceHasteNameMatches(this.path, name || undefined);
    }
    return hasteImpl.getHasteName(this.path);
  }

  /**
     * We extract the Haste name from the `@providesModule` docbloc field. This is
     * not allowed for modules living in `node_modules`, except if they are
     * whitelisted.
     */
  _readHasteNameFromDocBlock() {
    const moduleDocBlock = this._readDocBlock();const
    providesModule = moduleDocBlock.providesModule;
    if (providesModule && !this._depGraphHelpers.isNodeModulesDir(this.path)) {
      return (/^\S+/.exec(providesModule)[0]);
    }
    return null;
  }

  /**
     * To what we read from the cache or worker, we need to add id and source.
     */
  _finalizeReadResult(source, result) {
    return _extends({}, result, { source });
  }

  _transformCodeFor(
  cacheProps)
  {var _this4 = this;return _asyncToGenerator(function* () {const
      _transformCode = _this4._transformCode;
      invariant(_transformCode != null, 'missing code transform funtion');const
      sourceCode = cacheProps.sourceCode,transformOptions = cacheProps.transformOptions;
      return yield _transformCode(_this4, sourceCode, transformOptions);})();
  }

  _transformAndStoreCodeGlobally(
  cacheProps,
  globalCache)
  {var _this5 = this;return _asyncToGenerator(function* () {
      const result = yield _this5._transformCodeFor(cacheProps);
      globalCache.store(cacheProps, result);
      return result;})();
  }

  _getTransformedCode(
  cacheProps)
  {var _this6 = this;return _asyncToGenerator(function* () {
      const globalCache = _this6._options.globalTransformCache;
      if (globalCache == null || !globalCache.shouldFetch(cacheProps)) {
        return yield _this6._transformCodeFor(cacheProps);
      }
      const globalCachedResult = yield globalCache.fetch(cacheProps);
      if (globalCachedResult != null) {
        return globalCachedResult;
      }
      return yield _this6._transformAndStoreCodeGlobally(cacheProps, globalCache);})();
  }

  _getAndCacheTransformedCode(
  cacheProps)
  {var _this7 = this;return _asyncToGenerator(function* () {
      const result = yield _this7._getTransformedCode(cacheProps);
      _this7._options.transformCache.writeSync(_extends({}, cacheProps, { result }));
      return result;})();
  }

  /**
     * Shorthand for reading both from cache or from fresh for all call sites that
     * are asynchronous by default.
     */
  read(transformOptions) {
    return Promise.resolve().then(() => {
      const cached = this.readCached(transformOptions);

      if (cached != null) {
        return cached;
      }
      return this.readFresh(transformOptions);
    });
  }

  /**
     * Same as `readFresh`, but reads from the cache instead of transforming
     * the file from source. This has the benefit of being synchronous. As a
     * result it is possible to read many cached Module in a row, synchronously.
     */
  readCached(transformOptions) {
    const key = stableObjectHash(transformOptions || {});
    let result = this._readResultsByOptionsKey.get(key);
    if (result != null) {
      return result;
    }
    result = this._readFromTransformCache(transformOptions, key);
    this._readResultsByOptionsKey.set(key, result);
    return result;
  }

  /**
     * Read again from the TransformCache, on disk. `readCached` should be favored
     * so it's faster in case the results are already in memory.
     */
  _readFromTransformCache(
  transformOptions,
  transformOptionsKey)
  {
    const cacheProps = this._getCacheProps(
    transformOptions,
    transformOptionsKey);

    const cachedResult = this._options.transformCache.readSync(cacheProps);

    if (cachedResult == null) {
      return null;
    }
    return this._finalizeReadResult(cacheProps.sourceCode, cachedResult);
  }

  /**
     * Gathers relevant data about a module: source code, transformed code,
     * dependencies, etc. This function reads and transforms the source from
     * scratch. We don't repeat the same work as `readCached` because we assume
     * call sites have called it already.
     */
  readFresh(transformOptions) {var _this8 = this;
    const key = stableObjectHash(transformOptions || {});
    const promise = this._readPromises.get(key);
    if (promise != null) {
      return promise;
    }
    const freshPromise = _asyncToGenerator(function* () {
      const cacheProps = _this8._getCacheProps(transformOptions, key);
      const freshResult = yield _this8._getAndCacheTransformedCode(cacheProps);
      const finalResult = _this8._finalizeReadResult(
      cacheProps.sourceCode,
      freshResult);

      _this8._readResultsByOptionsKey.set(key, finalResult);
      return finalResult;
    })();
    this._readPromises.set(key, freshPromise);
    return freshPromise;
  }

  _getCacheProps(transformOptions, transformOptionsKey) {
    const sourceCode = this._readSourceCode();
    const getTransformCacheKey = this._getTransformCacheKey;
    return {
      filePath: this.path,
      localPath: this.localPath,
      sourceCode,
      getTransformCacheKey,
      transformOptions,
      transformOptionsKey,
      cacheOptions: {
        resetCache: this._options.resetCache,
        reporter: this._options.reporter } };


  }

  hash() {
    return `Module : ${this.path}`;
  }

  isAsset() {
    return false;
  }

  isPolyfill() {
    return false;
  }}


// use weak map to speed up hash creation of known objects
const knownHashes = new WeakMap();
function stableObjectHash(object) {
  let digest = knownHashes.get(object);
  if (!digest) {
    digest = crypto.
    createHash('md5').
    update(jsonStableStringify(object)).
    digest('base64');
    knownHashes.set(object, digest);
  }

  return digest;
}

module.exports = Module;