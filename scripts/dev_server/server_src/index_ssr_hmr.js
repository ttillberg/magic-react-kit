const http = require('http')
let app = require('./server').default

const server = http.createServer(app)
let currentApp = app

var listener = server.listen(3000, () => {
  const host = listener.address()
  console.log(`🌶  dev-server listening on port ${host.port}`)
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
    process.env.VERBOSE && console.log('[ssr hmr]' + status + 0)
  })
}
