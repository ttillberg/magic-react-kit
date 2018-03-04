const { resolveApp, resolveOwn } = require('../../../../config/paths')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const VERSION = require(resolveApp('package.json')).version
const outputPath = resolveApp('server_dist')

const { APP_PATH, APP_ENTRY } = process.env
const sourceDirs = [APP_PATH]

module.exports = {
  devtool: 'source-map',
  entry: [resolveOwn('scripts/common/client_entry/index_client')],
  output: {
    path: outputPath,
    filename: path.join('assets', 'client.js'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      __IS_DEV__: false,
      __IS_SERVER__: false,
      __DATE__: JSON.stringify(new Date()),
      __BUILD_VERSION__: JSON.stringify(VERSION),
      __API_URL__: JSON.stringify(''),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin({
      filename: 'assets/styles.css',
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      APP_PATH,
      resolveApp('node_modules'),
      resolveOwn('scripts/common/client_entry/index_client'),
    ],
  },
  module: {
    rules: require(resolveOwn('config/webpack.loaders')).rules,
  },
}
