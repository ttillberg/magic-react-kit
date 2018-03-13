process.env.BUILD_TARGET = 'browser'

const webpack = require('webpack')
const paths = require('../../paths')
const create_webpack_result_handler = require(paths.resolveLib('webpack_output_handler'))
const webpackConfig = require('./client.config')

module.exports = function build() {
  return new Promise((resolve, reject) => {
    var compiler = webpack(webpackConfig, create_webpack_result_handler(resolve, reject))
  })
}
