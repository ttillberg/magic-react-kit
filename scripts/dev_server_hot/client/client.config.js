var path = require('path')
const { resolveApp, resolveOwn, resolveLib } = require('../../paths')
var webpack = require('webpack')

var packageData = require(resolveApp('package.json'))
var VERSION = 'v' + packageData.version
var PROJECT_NAME = packageData.name

const dist = path.join(__dirname, '../dist')

module.exports = {
  name: 'client',
  target: 'web',
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    require.resolve('webpack-hot-middleware/client'),

    resolveLib('client_entry/index_client'),
  ],

  optimization: {
    noEmitOnErrors: true,
  },

  output: {
    filename: 'client.js',
    path: dist,
    publicPath: '/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BABEL_ENV: JSON.stringify('development'),
      },
      __IS_SERVER__: false,
      __IS_DEV__: true,
      __DATE__: JSON.stringify(new Date()),
      __PROJECT_NAME__: JSON.stringify(PROJECT_NAME),
      __BUILD_VERSION__: JSON.stringify(VERSION),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolveApp('src'),
    },
    modules: [resolveApp('src'), resolveApp('node_modules'), resolveOwn('node_modules')],
  },
  module: {
    rules: require(resolveLib('webpack.loaders')).rules,
  },
}
