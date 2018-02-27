const { resolveApp, resolveOwn } = require('../../config/paths')
const webpack = require('webpack')
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const webpackConfig = require('./config/webpack.config.client')
var spawn = require('cross-spawn')
const DEBUG = process.env.DEBUG

var rimraf = require('rimraf')
var path = require('path')

rimraf.sync(resolveApp('build'))

build()
  .then(() => {
    console.log('[webpack] done')

    require('./start-ssr')().then(() => {
      console.log('[webpack] Launching hot backend')
      spawn('node', ['.'], {
        stdio: 'inherit',
        cwd: resolveApp('build'),
      })
    })
  })
  .catch(err => {
    console.log('nope', err)
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
      return resolve({
        stats,
        warnings: messages.warnings,
      })
    })
  })
}
