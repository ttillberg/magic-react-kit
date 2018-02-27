const webpack = require('webpack')
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const webpackConfig = require('./config/webpack.server.config')

module.exports = function build() {
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
