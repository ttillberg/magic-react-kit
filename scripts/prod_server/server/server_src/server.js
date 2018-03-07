import http from 'http'
import express from 'express'
import render from '../../../common/server_entry/render_react_app'

startServer()

function startServer() {
  console.log('Start server-side-renderer')

  const app = express()
  app.use(express.static('assets'))
  app.get('*', (req, res) => {
    let html = render(req, '/client.js')
    res.send(html)
  })

  const server = http.createServer(app)

  server.listen(3000, () => {
    console.log('\n\n📡   127.0.0.1:3000\n\n')
  })
}
