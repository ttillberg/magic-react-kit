const { resolveApp, resolveOwn, resolveLib } = require('../../paths')
const path = require('path')
const webpack = require('webpack')
const { testJS } = require(resolveLib('webpack.loaders'))

var packageData = require(resolveApp('package.json'))
var VERSION = 'v' + packageData.version
var PROJECT_NAME = packageData.name

const APP_STRIP_NODE_MODULES = true
const externals = APP_STRIP_NODE_MODULES ? [require('webpack-node-externals')()] : []

module.exports = {
  name: 'ssr-prod',
  devtool: 'source-map',
  entry: [require.resolve('./server_src/app_renderer.js')],
  target: 'node',
  output: {
    path: resolveApp('server_dist'),
    filename: 'app_renderer.js',
    libraryTarget: 'commonjs2',
  },

  externals,

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(resolveApp('node_modules')),
      path.resolve(resolveOwn('node_modules')),
      path.resolve(resolveApp('src')),
      path.resolve(__dirname, 'server_src'),
    ],
    alias: {
      '@': resolveApp('src'),
    },
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BABEL_ENV: JSON.stringify('production'),
        BUILD_TARGET: JSON.stringify('node'),
      },
      __IS_SERVER__: JSON.stringify(true),
      __IS_DEV__: JSON.stringify(false),
      __DATE__: JSON.stringify(new Date()),
      __PROJECT_NAME__: JSON.stringify(PROJECT_NAME),
      __BUILD_VERSION__: JSON.stringify(VERSION),
    }),
  ],
  module: {
    rules: [
      {
        ...testJS,
        include: [
          resolveApp('src'),
          path.resolve(__dirname, '../server_src'),
          resolveLib('server_entry'),
        ],
      },
      {
        test: /\.scss$/,
        include: [resolveApp('src')],
        exclude: /node_modules/,
        use: {
          loader: require.resolve('ignore-loader'),
        },
      },
    ],
  },
}
