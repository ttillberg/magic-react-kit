process.env.BUILD_TARGET = 'browser'

const webpack = require('webpack')
const paths = require('../../common/paths')
const create_webpack_result_handler = require(paths.resolveOwn(
  'scripts/common/webpack_output_handler'
))
const webpackConfig = require('./config/client.webpack.config')

module.exports = function build() {
  return new Promise((resolve, reject) => {
    var compiler = webpack(webpackConfig, create_webpack_result_handler(resolve, reject))
  })
}
