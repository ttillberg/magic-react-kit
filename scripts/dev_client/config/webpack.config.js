var path = require('path')
var { resolveOwn, resolveApp, resolveCommon } = require('../../common/paths')
var webpack = require('webpack')

var packageData = require(resolveApp('package.json'))
var VERSION = 'v' + packageData.version
var PROJECT_NAME = packageData.name

var IP = '0.0.0.0'

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    require.resolve('webpack-dev-server/client') + '?http://' + IP + ':3001/',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    require.resolve('webpack/hot/only-dev-server'),

    resolveCommon('client_entry/index_client.js'),
  ],

  output: {
    filename: 'bundle.js',
    publicPath: 'http://' + IP + ':3001/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
    rules: require(resolveCommon('webpack.loaders')).rules,
  },
}
