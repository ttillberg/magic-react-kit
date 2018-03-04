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

var listener = server.listen(3001, 'localhost', () => {
  const host = listener.address()
  console.log(`🌶  dev-client listening on port ${host.port}`)
})
