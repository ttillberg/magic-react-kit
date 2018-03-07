process.env.BUILD_TARGET = 'node'
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const { resolveCommon } = require('../../common/paths')
const create_webpack_logger = require(resolveCommon('webpack_output_handler'))
const webpackConfig = require('./config/server.webpack.config')

module.exports = function build() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig, create_webpack_logger(resolve, reject))
  })
}
