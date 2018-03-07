const paths = require('./paths')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const testJS = {
  test: /\.jsx?$/,
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
      plugins:
        process.env.NODE_ENV !== 'development'
          ? []
          : [
              require.resolve('react-hot-loader/babel'),
              process.env.BUILD_TARGET !== 'browser' || process.env.NODE_ENV !== 'development'
                ? false
                : require.resolve('babel-plugin-flow-react-proptypes'),
            ].filter(Boolean),
    },
  },
}
let scssLoader = [
  process.env.NODE_ENV === 'development'
    ? { loader: require.resolve('css-loader'), options: { sourceMap: true } }
    : false,
  { loader: require.resolve('css-loader'), options: { sourceMap: true } },
  {
    loader: require.resolve('postcss-loader'),
    options: {
      allChunks: true,
      plugins: [autoprefixer],
      sourceMap: true,
    },
  },
  { loader: require.resolve('sass-loader'), options: { sourceMap: true } },
].filter(Boolean)

const testSCSS = {
  exclude: /node_modules/,
  test: /\.scss$/,
  use: process.env.NODE_ENV === 'development' ? scssLoader : ExtractTextPlugin.extract(scssLoader),
}

module.exports = {
  testJS,
  testSCSS,
  rules: [testJS, testSCSS],
}
