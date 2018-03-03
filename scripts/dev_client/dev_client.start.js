#!/usr/local/bin/node
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.BUILD_TARGET = 'browser'

const paths = require('../../config/paths')
const appConfig = require(paths.resolveOwn('util/register_options'))
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackConfig = require('./dev_client.webpack.config.js')

const compiler = webpack(webpackConfig)

const server = new WebpackDevServer(compiler, {
  publicPath: webpackConfig.output.publicPath,
  inline: true,
  disableHostCheck: true,
  historyApiFallback: {
    // rewrites: [{ from: /   .*/, to: 'src/index.html' }],
  },
  overlay: {
    warnings: true,
    errors: true,
  },
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  noInfo: true,
  hot: true,
})

var listener = server.listen(3001, 'localhost', () => {
  const host = listener.address()
  console.log(`🌶  dev-client listening on port ${host.port}`)
})