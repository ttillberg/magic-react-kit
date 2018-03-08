import express from 'express'
import render from '../../common/server_entry/render_react_app'

const app = express()

const matchOnlyPageUrls = /.*(\/|\/[a-z0-9_-]+)$/

app.get(matchOnlyPageUrls, (req, res) => {
  let html = render(req, null, state => {
    const htmlWithState = render(req, 'http://0.0.0.0:8888/bundle.js', false, state)
    res.setHeader('Cache-Control', 'public, max-age=60') // 1min for testing
    res.send(htmlWithState)
  })
})

export default app
