const { resolveApp, resolveOwn, resolveLib } = require('../../paths')

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const outputPath = resolveApp('server_dist')
const config = require(resolveLib('read_config'))

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: [resolveLib('client_entry/index_client')],
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
      __BUILD_VERSION__: JSON.stringify(config.version),
      __PROJECT_NAME__: JSON.stringify(config.name),
      __API_URL__: JSON.stringify(''),
    }),

    new ExtractTextPlugin({
      filename: 'static/styles.css',
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      resolveApp(config.src),
      resolveOwn('node_modules'),
      resolveApp('node_modules'),
      resolveLib('client_entry/index_client'),
    ],
    alias: {
      '@': resolveApp(config.src),
      __STORE_ENTRY__$: config.storeEntry,
      __APP_ENTRY__$: config.appEntry,
    },
  },
  module: {
    rules: require(resolveLib('webpack.loaders')).rules,
  },
}
