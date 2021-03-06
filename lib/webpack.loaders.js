const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

// exclude all node_modules except ours
const nodeModuleExcludes = /node_modules\/(?!(magic-react-kit)\/).*/

const testJS = {
  test: /\.jsx?$/,
  exclude: nodeModuleExcludes,
  use: {
    loader: require.resolve('babel-loader'),
    options: {
      cacheDirectory: true,
      presets: require('./babel_presets.js'),
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
    ? { loader: require.resolve('style-loader'), options: { sourceMap: true } }
    : false,
  { loader: require.resolve('css-loader'), options: { sourceMap: true } },
  {
    loader: require.resolve('postcss-loader'),
    options: {
      plugins: [autoprefixer],
      sourceMap: true,
    },
  },
  { loader: require.resolve('sass-loader'), options: { sourceMap: true } },
].filter(Boolean)

const testSCSS = {
  test: /\.scss$/,
  exclude: nodeModuleExcludes,
  use: process.env.NODE_ENV === 'development' ? scssLoader : ExtractTextPlugin.extract(scssLoader),
}
const testFonts = {
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  use: {
    loader: require.resolve('url-loader'),
    options: {},
  },
}

const testJSON = {
  test: /\.json$/,
  use: {
    loader: require.resolve('json-loader'),
  },
}

module.exports = {
  testJS,
  testSCSS,
  rules: [testJS, testSCSS, testJSON, testFonts],
}
