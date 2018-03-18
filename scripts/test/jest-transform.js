const babelJest = require('babel-jest')
const presets = require('../../lib/babel_presets.js')

module.exports = babelJest.createTransformer({
  presets,
})
