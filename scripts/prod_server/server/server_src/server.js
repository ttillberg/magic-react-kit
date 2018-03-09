const http = require('http')
const express = require('express')
const render = require('./app_renderer').render

startServer()

function startServer() {
  console.log('start server...')

  const app = express()
  app.use(express.static('static'))

  const matchOnlyPageUrls = /.*(\/|\/[a-z0-9_-]+)$/

  const renderOptions = {
    scriptHref: '/client.js',
    stylesHref: '/styles.css',
  }

  // Prerender pages
  app.get(matchOnlyPageUrls, (req, res) => {
    render(req, renderOptions).then(html => {
      res.setHeader('Cache-Control', 'public, max-age=600') // 10min for testing
      res.send(html)
    })
  })

  const server = http.createServer(app)

  server.listen(3000, () => {
    console.log('\n\n📡   0.0.0.0:3000\n\n')
  })
}
