const { lib: { entries } } = require('serverless-webpack')
const request = require('sync-request')
const nodeExternals = require('webpack-node-externals')
const res = request('get', 'https://raw.githubusercontent.com/iot-course/org/master/eslintOptions.json')
const options = JSON.parse(res.getBody('utf8'))


module.exports = {
  entry: entries,
  // stats: 'minimal',
  target: 'node',
  externals: [nodeExternals()],
  module:{ rules: [
    {test: /\.js$/, loader:'babel-loader', exclude: /node_modules/},
    {test: /\.js$/, loader:'eslint-loader', exclude: /node_modules/,  options},
  ]}
}
