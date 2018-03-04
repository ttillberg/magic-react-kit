const webpackConfig = require('./webpack.config.js')

module.exports = {
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
}
