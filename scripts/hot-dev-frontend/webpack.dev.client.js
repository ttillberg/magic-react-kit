var path = require('path')
var paths = require('../../config/paths')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var VERSION = 'v' + require(paths.resolveApp('package.json')).version

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    require.resolve('webpack-dev-server/client') + '?http://0.0.0.0:3001',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    require.resolve('webpack/hot/only-dev-server'),

    paths.resolveApp('src/index'),
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
      __API_URL__: JSON.stringify('/'),
      __DATE__: JSON.stringify(new Date()),
      __BUILD_VERSION__: JSON.stringify(VERSION),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: '',
      template: paths.resolveApp('src/index.html'),
      hash: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [paths.resolveApp('src'), 'node_modules'],
  },
  module: require(paths.resolveOwn('config/webpack.loaders')),
}
