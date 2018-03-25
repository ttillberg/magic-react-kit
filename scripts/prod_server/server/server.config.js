const { resolveApp, resolveOwn, resolveLib } = require('../../paths')
const path = require('path')
const webpack = require('webpack')
const { testJS } = require(resolveLib('webpack.loaders'))

const config = require(resolveLib('read_config'))

const APP_STRIP_NODE_MODULES = true
const externals = APP_STRIP_NODE_MODULES
  ? [
      require('webpack-node-externals')({
        whitelist: [/magic-react-kit/],
      }),
    ]
  : []

module.exports = {
  name: 'ssr-prod',
  mode: 'production',
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
      path.resolve(resolveApp(config.src)),
      path.resolve(__dirname, 'server_src'),
    ],
    alias: {
      '@': resolveApp(config.src),
      __STORE_ENTRY__$: config.storeEntry,
      __APP_ENTRY__$: config.appEntry,
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BABEL_ENV: JSON.stringify('production'),
        BUILD_TARGET: JSON.stringify('node'),
      },
      __IS_SERVER__: JSON.stringify(true),
      __IS_DEV__: JSON.stringify(false),
      __DATE__: JSON.stringify(new Date()),
      __PROJECT_NAME__: JSON.stringify(config.name),
      __BUILD_VERSION__: JSON.stringify(config.version),
    }),
  ],
  module: {
    rules: [
      {
        ...testJS,
        include: [
          resolveApp(config.src),
          path.resolve(__dirname, '../server_src'),
          resolveLib('server_entry'),
        ],
      },
      {
        test: /\.scss$/,
        include: [resolveApp(config.src)],
        exclude: /node_modules/,
        use: {
          loader: require.resolve('ignore-loader'),
        },
      },
    ],
  },
}
