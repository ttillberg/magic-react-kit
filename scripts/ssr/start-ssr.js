const webpack = require('webpack')
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const webpackConfig = require('./config/webpack.server.config')
var chalk = require('chalk')
var spawn = require('cross-spawn')
const DEBUG = process.env.DEBUG

var rimraf = require('rimraf')
var path = require('path')

rimraf.sync(path.resolve(__dirname, './build'))

build().then(() => {
  console.log('[webpack] Launching hot backend')
  spawn('node', ['./build'], {
    stdio: 'inherit',
    cwd: __dirname,
  })
})

function build() {
  return new Promise((resolve, reject) => {
    var compiler = webpack(webpackConfig, (err, stats) => {
      if (err) {
        return reject(err)
      }
      const messages = formatWebpackMessages(stats.toJson({}, true))
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1
        }
        return reject(new Error(messages.errors.join('\n\n')))
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        )
        return reject(new Error(messages.warnings.join('\n\n')))
      }

      return resolve({
        stats,
        warnings: messages.warnings,
      })
    })
  })
}
