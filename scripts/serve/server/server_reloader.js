var http = require('http')
var chalk = require('chalk')
var app = require('./server').default

const server = http.createServer(app)
let currentApp = app
server.listen(8080)

if (module.hot) {
  module.hot.accept('./server', () => {
    console.log(chalk.magenta('[HTTP] Applying hot update'))

    server.removeListener('request', currentApp)

    app = require('./server').default
    server.on('request', app)
    currentApp = app
  })
  module.hot.addStatusHandler(status => {
    // console.log(status)
  })
}
