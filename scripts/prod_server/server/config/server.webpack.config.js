const { resolveApp, resolveOwn, resolveCommon } = require('../../../common/paths')
const path = require('path')
const webpack = require('webpack')
const { testJS } = require(resolveCommon('webpack.loaders'))

var packageData = require(resolveApp('package.json'))
var VERSION = 'v' + packageData.version
var PROJECT_NAME = packageData.name

const { APP_PATH, APP_ENTRY } = process.env
const APP_COMPILE_SERVER_NODE_MODULES = true

const externals = (APP_COMPILE_SERVER_NODE_MODULES && []) || [
  require('webpack-node-externals')({
    modulesDir: resolveOwn('node_modules'),
  }),
]

module.exports = {
  name: 'ssr-prod',
  devtool: 'source-map',
  entry: [require.resolve('../server_src/server.js')],
  target: 'node',
  output: {
    path: resolveApp('server_dist'),
    filename: 'server_compiled.js',
    libraryTarget: 'commonjs2',
  },

  externals,

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(resolveApp('node_modules')),
      path.resolve(resolveOwn('node_modules')),
      APP_PATH,
      path.resolve(__dirname, 'server_src'),
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BABEL_ENV: JSON.stringify('development'),
        BUILD_TARGET: JSON.stringify('node'),
      },
      __IS_SERVER__: true,
      __IS_DEV__: false,
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
          APP_PATH,
          path.resolve(__dirname, '../server_src'),
          resolveCommon('server_entry'),
        ],
      },
      {
        test: /\.scss$/,
        include: [APP_PATH],
        exclude: /node_modules/,
        use: {
          loader: require.resolve('ignore-loader'),
        },
      },
    ],
  },
}
