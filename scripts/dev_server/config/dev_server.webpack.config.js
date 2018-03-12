const { resolveApp, resolveOwn, resolveCommon } = require('../../common/paths')
require(resolveCommon('register_options'))
const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

var hotScript = 'webpack/hot/poll' + '?1000'

const { APP_PATH } = process.env

module.exports = {
  name: 'SSR',
  entry: [hotScript, path.resolve(__dirname, '../server_src/index')],
  target: 'node',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../server_dist'),
    filename: 'dev_server_compiled.js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    nodeExternals({
      modulesDir: resolveOwn('node_modules'),
      whitelist: [hotScript],
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, './server_src'), // server modules
      resolveOwn('node_modules'),
      resolveApp('node_modules'),
      APP_PATH,
    ],
    alias: {
      '@': resolveApp('src'),
    },
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BABEL_ENV: JSON.stringify('development'),
        BUILD_TARGET: JSON.stringify('node'),
      },
      __IS_SERVER__: true,
    }),
  ],
  module: {
    rules: [
      require(resolveCommon('webpack.loaders')).testJS,
      {
        test: /\.(scss|jpg|png|svgz)$/,
        use: {
          loader: require.resolve('ignore-loader'),
        },
      },
    ],
  },
}
