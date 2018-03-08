const http = require('http')
const express = require('express')
const render = require('./app_renderer').render

startServer()

function startServer() {
  console.log('start server...')

  const app = express()
  app.use(express.static('static'))

  const matchOnlyPageUrls = /.*(\/|\/[a-z0-9_-]+)$/

  // Prerender pages
  app.get(matchOnlyPageUrls, (req, res) => {
    render(req).then(html => {
      res.send(html)
    })
  })

  const server = http.createServer(app)

  server.listen(3000, () => {
    console.log('\n\n📡   0.0.0.0:3000\n\n')
  })
}
