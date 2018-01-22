/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 * @format
 */

'use strict';

const babel = require('babel-core');
const inlinePlatform = require('./inline-platform');
const invariant = require('fbjs/lib/invariant');

import type {Ast} from 'babel-core';
import type {BabelSourceMap} from 'babel-core';
const t = babel.types;

const env = {name: 'env'};
const nodeEnv = {name: 'NODE_ENV'};
const processId = {name: 'process'};

const dev = {name: '__DEV__'};

const isGlobal = binding => !binding;

const isFlowDeclared = binding => t.isDeclareVariable(binding.path);

const isGlobalOrFlowDeclared = binding =>
  isGlobal(binding) || isFlowDeclared(binding);

const isLeftHandSideOfAssignmentExpression = (node, parent) =>
  t.isAssignmentExpression(parent) && parent.left === node;

const isProcessEnvNodeEnv = (node, scope) =>
  t.isIdentifier(node.property, nodeEnv) &&
  t.isMemberExpression(node.object) &&
  t.isIdentifier(node.object.property, env) &&
  t.isIdentifier(node.object.object, processId) &&
  isGlobal(scope.getBinding(processId.name));

const isDev = (node, parent, scope) =>
  t.isIdentifier(node, dev) &&
  isGlobalOrFlowDeclared(scope.getBinding(dev.name)) &&
  !t.isMemberExpression(parent);

function findProperty(objectExpression, key, fallback) {
  const property = objectExpression.properties.find(p => p.key.name === key);
  return property ? property.value : fallback();
}

const inlinePlugin = {
  visitor: {
    Identifier(path, state) {
      if (isDev(path.node, path.parent, path.scope)) {
        path.replaceWith(t.booleanLiteral(state.opts.dev));
      }
    },
    MemberExpression(path, state) {
      const node = path.node;
      const scope = path.scope;
      const opts = state.opts;

      if (!isLeftHandSideOfAssignmentExpression(node, path.parent)) {
        if (inlinePlatform.isPlatformNode(node, scope, opts.isWrapped)) {
          path.replaceWith(t.stringLiteral(opts.platform));
        } else if (isProcessEnvNodeEnv(node, scope)) {
          path.replaceWith(
            t.stringLiteral(opts.dev ? 'development' : 'production'),
          );
        }
      }
    },
    CallExpression(path, state) {
      const node = path.node;
      const scope = path.scope;
      const arg = node.arguments[0];
      const opts = state.opts;

      if (inlinePlatform.isPlatformSelectNode(node, scope, opts.isWrapped)) {
        const fallback = () =>
          findProperty(arg, 'default', () => t.identifier('undefined'));
        const replacement = t.isObjectExpression(arg)
          ? findProperty(arg, opts.platform, fallback)
          : node;

        path.replaceWith(replacement);
      } else if (
        inlinePlatform.isPlatformOSSelect(node, scope, opts.isWrapped)
      ) {
        path.replaceWith(
          inlinePlatform.getReplacementForPlatformOSSelect(node, opts.platform),
        );
      }
    },
  },
};

const plugin = () => inlinePlugin;

type AstResult = {
  ast: Ast,
  code: ?string,
  map: ?BabelSourceMap,
};

function inline(
  filename: string,
  transformResult: {ast?: ?Ast, code: string, map: ?BabelSourceMap},
  options: {+dev: boolean, +platform: ?string},
): AstResult {
  const code = transformResult.code;
  const babelOptions = {
    filename,
    plugins: [[plugin, options]],
    inputSourceMap: transformResult.map,
    sourceMaps: true,
    sourceFileName: filename,
    code: false,
    babelrc: false,
    compact: true,
  };

  const result = transformResult.ast
    ? babel.transformFromAst(transformResult.ast, code, babelOptions)
    : babel.transform(code, babelOptions);
  const {ast} = result;
  invariant(ast != null, 'Missing AST in babel transform results.');
  return {ast, code: result.code, map: result.map};
}

inline.plugin = inlinePlugin;
module.exports = inline;
