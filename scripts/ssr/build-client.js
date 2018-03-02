const webpack = require('webpack')
const paths = require('../../config/paths')
const handleWebpackResult = require(paths.resolveOwn('util/handleWebpackResult'))

const webpackConfig = require('./config/webpack.config.client')

module.exports = function build() {
  console.log('=> Compile client + assets')
  return new Promise((resolve, reject) => {
    var compiler = webpack(webpackConfig, handleWebpackResult(resolve, reject))
  })
}
