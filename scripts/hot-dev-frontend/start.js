var WebpackDevServer = require('webpack-dev-server')
var webpack = require('webpack')
var webpackConfig = require('../../config/webpack.dev.js')

var compiler = webpack(webpackConfig)

var server = new WebpackDevServer(compiler, {
  publicPath: webpackConfig.output.publicPath,
  inline: true,
  disableHostCheck: true,
  port: 3000,
  historyApiFallback: {
    rewrites: [{ from: /   .*/, to: 'src/index.html' }],
  },
  overlay: {
    warnings: true,
    errors: true,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  noInfo: false,
  hot: true,
})

server.listen(3000, 'localhost', function() {})
