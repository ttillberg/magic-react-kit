const path = require('path')
const StartServerPlugin = require('start-server-webpack-plugin')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const paths = require('../../../config/paths')

module.exports = {
  name: 'SSR-PROD',
  entry: [require.resolve('../src/server.js')],
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../build/'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },

  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../../node_modules'),
      whitelist: [],
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules', // app modules
      paths.appSrc,
      path.resolve(__dirname, '../../../node_modules'), // server node modules
    ],
  },

  plugins: [
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
        include: [path.resolve(__dirname, '../src'), paths.appSrc],
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
