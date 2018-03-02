const paths = require('./paths')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')
var path = require('path')

module.exports = {
  rules: [
    {
      test: /\.jsx?$/,
      include: paths.appSrc,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            require.resolve('@babel/preset-env'),
            require.resolve('@babel/preset-react'),
            require.resolve('@babel/preset-flow'),
            require.resolve('@babel/preset-stage-2'),
          ],
          plugins: [
            require.resolve('react-hot-loader/babel'),
            require.resolve('babel-plugin-flow-react-proptypes'),
          ],
        },
      },
    },
    {
      test: /\.scss$/,
      use:
        // ExtractTextPlugin.extract(
        [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
              // filename: 'styles.css',
              allChunks: true,
            },
          },
          'sass-loader',
        ],
      // ),
    },
  ],
}
