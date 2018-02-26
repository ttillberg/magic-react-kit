/*@flow*/
var webpack = require('webpack')
var chalk = require('chalk')
var path = require('path')
var config = require('./config/webpack.serve.config')
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const spawn = require('cross-spawn')

const DEBUG = process.env.DEBUG

build().then(() => {
  console.log('[webpack] Build done')

  console.log('[webpack] Lunaching hot backend')
  spawn('node', ['./server/build/server_reloader_compiled.js'], {
    stdio: 'inherit',
    cwd: __dirname,
  })

  console.log('[webpack] Launching hot front-end')
  spawn('node', [path.resolve(__dirname, '../hot-dev-frontend/start.js')], {
    stdio: 'inherit',
  })
})

function build() {
  var compiler = webpack(config)

  return new Promise((resolve, reject) => {
    compiler.watch(
      {
        poll: 1000,
        ignored: 'node_modules',
      },
      (err, stats) => {
        if (err) {
          DEBUG && console.log(chalk.red('[webpack] Watch rejected'))
          return reject(err)
        }
        DEBUG && console.log(chalk.magenta('[webpack] Watch invoked'))

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
      }
    )
  })
}
