'use strict';

const http = require('http');
const request = require('request');
const metroBundler = require('./src');
const TerminalReporter = require('./src/lib/TerminalReporter');
const {Terminal} = require('metro-core')

const metroBundlerServer = metroBundler.createServer({
  assetRegistryPath: __dirname,
  projectRoots: [__dirname],
  reporter: new TerminalReporter(new Terminal(process.stdout)),
});


const httpServer = http.createServer(
  metroBundlerServer.processRequest.bind(metroBundlerServer)
)


process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});



process.on('unhandledRejection', () => {})

httpServer.listen(8082)
