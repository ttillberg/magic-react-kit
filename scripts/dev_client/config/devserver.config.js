const webpackConfig = require('./webpack.config.js')

var IP = '0.0.0.0'

module.exports = {
  publicPath: webpackConfig.output.publicPath,
  inline: true,
  noInfo: false,
  hot: true,
  disableHostCheck: true,
  historyApiFallback: true,
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
}
