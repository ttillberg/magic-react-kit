var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')

const { resolveApp, resolveOwn } = require('../../../config/paths')

var VERSION = require(resolveApp('package.json')).version

var parentDir = './'
var outputPath = resolveApp('build')

var sourceDirs = [path.resolve(__dirname, '../src'), resolveApp('src')]

module.exports = {
  devtool: 'source-map',
  entry: ['index'],
  output: {
    path: outputPath,
    filename: path.join('assets', 'client.js'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      __IS_DEV__: false,
      __DATE__: JSON.stringify(new Date()),
      __BUILD_VERSION__: JSON.stringify(VERSION),
      __API_URL__: JSON.stringify(''),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin({
      filename: 'assets/styles.scss',
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [resolveApp('src'), resolveOwn('node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: sourceDirs,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              [require.resolve('@babel/preset-env'), { modules: false }],
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-flow'),
              require.resolve('@babel/preset-stage-2'),
            ],
            plugins: [require.resolve('react-hot-loader/babel')],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
              filename: path.join('scripts', VERSION, '/tockr_' + VERSION + '.css'),
              allChunks: true,
            },
          },
          'sass-loader',
        ]),
        // loader: [
        //   'style-loader',
        //   'css-loader',
        //   {
        //     loader: 'postcss-loader',
        //     options: {
        //       plugins: loader => [
        //         // require('autoprefixer')({browsers: ['last 3 versions', 'iOS 9']}),
        //       ],
        //     },
        //   },
        //   'sass-loader',
        // ],
        include: resolveApp('src'),
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        loader: ['file-loader'],
        include: resolveApp('src'),
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        loader: ['svg-url-loader'],
        include: resolveApp('src'),
        exclude: /node_modules/,
      },
      {
        test: /fonts\/.+\.(eot|svg|ttf|woff|woff2)$/,
        loader: ['file-loader'],
        include: resolveApp('src'),
        exclude: /node_modules/,
      },
    ],
  },
}
