var http = require('http')
var app = require('./server').default

const server = http.createServer(app)
let currentApp = app
server.listen(3000, () => {
  console.log('🌶  Server-side rendering active on port 3000')
})

if (module.hot) {
  module.hot.accept('./server', () => {
    console.log('🌶  applying server-side hot update')

    server.removeListener('request', currentApp)

    app = require('./server').default
    server.on('request', app)
    currentApp = app
  })
  module.hot.addStatusHandler(status => {
    // console.log(status)
  })
}
