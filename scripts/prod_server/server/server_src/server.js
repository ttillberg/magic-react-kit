import http from 'http'
import express from 'express'
import render from '../../../common/server_entry/render_react_app'

startServer()

function startServer() {
  console.log('Start server-side-renderer')

  const app = express()
  app.use(express.static('assets'))

  const matchOnlyPageUrls = /.*(\/|\/[a-z0-9_-]+)$/
  // Prerender pages
  app.get(matchOnlyPageUrls, (req, res) => {
    // first pass: gather the data
    // We don't care about the output at this stage but instead attach
    // a callback fired by the application when the async is done.
    let html = render(req, '/client.js', state => {
      // Second pass: render the DOM
      // Pass the prefetched state as-is to hydrate the renderer.
      // We should now have a complete representation of the loaded app.
      const htmlWithState = render(req, '/client.js', false, state)
      // return the complete HTML
      res.send(htmlWithState)
    })
  })

  const server = http.createServer(app)

  server.listen(3000, () => {
    console.log('\n\n📡   0.0.0.0:3000\n\n')
  })
}
