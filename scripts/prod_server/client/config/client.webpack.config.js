const { resolveApp, resolveOwn, resolveCommon } = require('../../../common/paths')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const outputPath = resolveApp('server_dist')
const packageData = require(resolveApp('package.json'))

const VERSION = packageData.version
const PROJECT_NAME = packageData.name

const { APP_PATH, APP_ENTRY } = process.env
const sourceDirs = [APP_PATH]

module.exports = {
  devtool: 'source-map',
  entry: [resolveCommon('client_entry/index_client')],
  output: {
    path: outputPath,
    filename: path.join('static', 'client.js'),
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
      __PROJECT_NAME__: JSON.stringify(PROJECT_NAME),
      __API_URL__: JSON.stringify(''),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin({
      filename: 'static/styles.css',
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      APP_PATH,
      'node_modules',
      resolveApp('node_modules'),
      resolveCommon('client_entry/index_client'),
    ],
    alias: {
      '@': resolveApp('src'),
    },
  },
  module: {
    rules: require(resolveCommon('webpack.loaders')).rules,
  },
}
