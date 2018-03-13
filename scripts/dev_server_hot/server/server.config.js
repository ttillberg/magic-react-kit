const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const { resolveApp, resolveOwn, resolveLib } = require('../../paths')

const dist = path.join(__dirname, '../dist')

module.exports = {
  name: 'server',
  mode: 'development',
  entry: [path.resolve(__dirname, 'server_entry')],
  target: 'node',
  devtool: 'source-map',
  optimization: {
    noEmitOnErrors: true,
  },
  output: {
    path: dist,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    nodeExternals({
      modulesDir: resolveOwn('node_modules'),
      // whitelist: [hotScript],
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, './server_src'), // server modules
      resolveOwn('node_modules'),
      resolveApp('node_modules'),
      resolveApp('src'),
    ],
    alias: {
      '@': resolveApp('src'),
    },
  },

  plugins: [
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
      require(resolveLib('webpack.loaders')).testJS,
      {
        test: /\.(scss|jpg|png|svgz)$/,
        use: {
          loader: require.resolve('ignore-loader'),
        },
      },
    ],
  },
}
