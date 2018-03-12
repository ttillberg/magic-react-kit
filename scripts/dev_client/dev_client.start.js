#!/usr/local/bin/node
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.BUILD_TARGET = 'browser'

const { resolveOwn, resolveCommon } = require('../common/paths')
const appConfig = require(resolveCommon('register_options'))
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackConfig = require('./config/webpack.config.js')
const devServerConfig = require('./config/devserver.config.js')
const compiler = webpack(webpackConfig)

const server = new WebpackDevServer(compiler, devServerConfig)
var IP = '0.0.0.0'
var listener = server.listen(3001, IP, () => {
  // retrieve listener address and port number for logging
  const host = listener.address()
  console.log(`🌶  dev-client listening on port ${host.port}`)
  // if the client runs as a child process (e.g dev server) we'd like to
  // notify the parent process that the compilation went well.
  if (process.send) {
    process.send('process_ready')
  }
})
