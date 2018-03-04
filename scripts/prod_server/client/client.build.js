process.env.BUILD_TARGET = 'browser'

const webpack = require('webpack')
const paths = require('../../../config/paths')
const create_webpack_result_handler = require(paths.resolveOwn('util/webpack_output_handler'))
const webpackConfig = require('./config/client.webpack.config')

module.exports = function build() {
  console.log('Compile client and assets')
  return new Promise((resolve, reject) => {
    var compiler = webpack(webpackConfig, create_webpack_result_handler(resolve, reject))
  })
}
