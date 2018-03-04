process.env.BUILD_TARGET = 'node'

const webpack = require('webpack')
const paths = require('../../../config/paths')
const create_webpack_result_handler = require(paths.resolveOwn('util/webpack_output_handler'))
const webpackConfig = require('./config/server.webpack.config')

module.exports = function build() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig, create_webpack_result_handler(resolve, reject))
  })
}
