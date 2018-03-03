const path = require('path')
const webpack = require('webpack')
const { testJS } = require('../../config/webpack.loaders')
const { resolveApp, resolveOwn } = require('../../config/paths')

const { APP_PATH, APP_ENTRY } = process.env
const APP_COMPILE_SERVER_NODE_MODULES = true

const externals = (APP_COMPILE_SERVER_NODE_MODULES && []) || [
  require('webpack-node-externals')({
    modulesDir: path.resolve(__dirname, '../../node_modules'),
  }),
]

testJS.include = [APP_PATH, path.resolve(__dirname, 'server_src')]

module.exports = {
  name: 'ssr-prod',
  devtool: 'source-map',
  entry: [require.resolve('./server_src/server.js')],
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
      path.resolve(__dirname, 'server_src'),
      'node_modules',
      APP_PATH,
      path.resolve(__dirname, '../../node_modules'),
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
    }),
  ],
  module: {
    rules: [
      testJS,
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
