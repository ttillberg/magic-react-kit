var WebpackDevServer = require('webpack-dev-server')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.client.js')

var compiler = webpack(webpackConfig)

var server = new WebpackDevServer(compiler, {
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
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  noInfo: true,
  hot: true,
})

server.listen(3001, 'localhost', a => {
  console.log('🌶  Starting hot client...')
})
