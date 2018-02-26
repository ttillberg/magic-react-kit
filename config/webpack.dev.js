var path = require('path')
var paths = require('./paths')
var webpack = require('webpack')

var VERSION = 'v' + require(path.resolve(paths.appSrc, '../package.json')).version

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    require.resolve('webpack-dev-server/client') + '?http://0.0.0.0:3000',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    require.resolve('webpack/hot/only-dev-server'),

    path.resolve(paths.appSrc, 'index'),
  ],

  output: {
    filename: 'bundle.js',
    // required to serve hot from :8080
    publicPath: '//0.0.0.0:3000/static/',
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
      __API_URL__: JSON.stringify('/'),
      __DATE__: JSON.stringify(new Date()),
      __BUILD_VERSION__: JSON.stringify(VERSION),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(paths.appSrc), 'node_modules'],
  },
  module: require('./webpack.loaders'),
}
