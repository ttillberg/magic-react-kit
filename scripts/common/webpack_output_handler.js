var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
var chalk = require('chalk')
module.exports = (resolve, reject) => (err, stats) => {
  if (err) {
    return reject(err)
  }
  const messages = formatWebpackMessages(stats.toJson({}, true))
  if (messages.errors.length) {
    if (messages.errors.length > 1) {
      messages.errors.length = 1
    }
    return reject(new Error(chalk.red(messages.errors.join('\n\n'))))
  }
  return resolve({
    stats,
    warnings: messages.warnings,
  })
}
