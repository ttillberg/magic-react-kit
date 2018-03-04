const path = require('path')
const argv = require('minimist')(process.argv)
const paths = require('./paths')
const chalk = require('chalk')

const appConfig = (process.env.appConfig = {
  sourceDir: process.env.APP_PATH || paths.resolveApp(''),
  entry: process.env.APP_ENTRY || 'App',
})

const makeAbsolute = p => (path.isAbsolute(p) ? p : paths.resolveApp(p))

let sourceDir = makeAbsolute(argv['path'] || process.env.APP_PATH || appConfig.sourceDir)
let entry = argv['entry'] || appConfig.entry || 'App'

process.env.APP_PATH = appConfig.sourceDir = sourceDir
process.env.APP_ENTRY = appConfig.entry = entry

try {
  require.resolve(entry, { paths: [sourceDir] })
} catch (e) {
  console.log(e)
  console.log(
    chalk.red(`
  Cannot resolve entry "${path.join(sourceDir, entry)}"
  Make sure the file exists inside the provided --path and has a valid extension
`)
  )

  process.exit(1)
}

module.exports = appConfig
