const webpack = require('webpack')
const paths = require('../../config/paths')
const handleWebpackResult = require(paths.resolveOwn('util/handleWebpackResult'))
const webpackConfig = require('./config/webpack.server.config')

module.exports = function build() {
  return new Promise((resolve, reject) => {
    console.log('=> Compile server-side-renderer')
    const compiler = webpack(webpackConfig, handleWebpackResult(resolve, reject))
  })
}
