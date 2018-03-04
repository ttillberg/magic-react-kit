var path = require('path')
var { resolveOwn, resolveApp } = require('../../../config/paths')
var webpack = require('webpack')

var VERSION = 'v' + require(resolveApp('package.json')).version

const { APP_PATH, APP_ENTRY } = process.env

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    require.resolve('webpack-dev-server/client') + '?http://0.0.0.0:3001',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    require.resolve('webpack/hot/only-dev-server'),

    APP_ENTRY,
  ],

  output: {
    filename: 'bundle.js',
    // required to serve hot from :3001
    publicPath: '//0.0.0.0:3001/',
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
      __IS_DEV__: true,
      __DATE__: JSON.stringify(new Date()),
      __BUILD_VERSION__: JSON.stringify(VERSION),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [APP_PATH, resolveOwn('node_modules')],
  },
  module: {
    rules: require(resolveOwn('config/webpack.loaders')).rules,
  },
}
