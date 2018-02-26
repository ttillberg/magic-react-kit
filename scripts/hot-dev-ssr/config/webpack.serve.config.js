const path = require('path')
const StartServerPlugin = require('start-server-webpack-plugin')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const paths = require('../../../config/paths')

var hotScript = require.resolve('../../../node_modules/webpack/hot/poll') + '?1000'

module.exports = {
  name: 'SSR',
  entry: [hotScript, require.resolve('../server/server_reloader')],
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/,
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../server/build/'),
    filename: 'server_reloader_compiled.js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../../node_modules'),
      whitelist: [hotScript],
    }),
    // path.resolve(__dirname, '../../../node_modules'),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      //
      path.resolve(__dirname, '../server'), // server modules
      'node_modules', // app modules
      paths.appSrc, // app src
      path.resolve(__dirname, '../../../node_modules'), // server node modules
    ],
  },

  plugins: [
    // new StartServerPlugin(path.resolve(__dirname, '../server/build/server_reloader_compiled.js')),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BABEL_ENV: JSON.stringify('development'),
        NODE_PATH: JSON.stringify('./src'),
        BUILD_TARGET: JSON.stringify('node'),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '../server'), paths.appSrc],
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              [require.resolve('@babel/preset-env'), { modules: false }],
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-flow'),
            ],
            plugins: [require.resolve('react-hot-loader/babel')],
          },
        },
      },
    ],
  },
}
