const path = require('path')
const argv = require('minimist')(process.argv)
const paths = require('../config/paths')
const chalk = require('chalk')

const appConfig = (process.env.appConfig = {
  sourceDir: process.env.APP_SOURCE_DIR || paths.resolveApp(''),
  entry: process.env.APP_ENTRY || 'index',
})

const makeAbsolute = p => (path.isAbsolute(p) ? p : paths.resolveApp(p))

let sourceDir = makeAbsolute(
  argv['source-dir'] || process.env.APP_SOURCE_DIR || appConfig.sourceDir
)
let entry = argv['entry'] || appConfig.entry || 'index'

process.env.APP_SOURCE_DIR = appConfig.sourceDir = sourceDir
process.env.APP_ENTRY = appConfig.entry = entry

try {
  require.resolve(entry, { paths: [sourceDir] })
} catch (e) {
  console.log(e)
  console.log(chalk.red(`Cannot resolve entry "${path.join(sourceDir, entry)}"`))
  process.exit(1)
}

module.exports = appConfig
