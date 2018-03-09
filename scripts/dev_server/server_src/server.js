import express from 'express'
import render_template from '../../common/server_entry/render_react_app'

const app = express()

const matchOnlyPageUrls = /.*(\/|\/[a-z0-9_-]+)$/

const renderOptions = {
  scriptHref: 'http://0.0.0.0:8888/bundle.js',
  stylesHref: null,
}

app.get(matchOnlyPageUrls, (req, res) => {
  let html = render_template(req.url).then(state => {
    render_template(req.url, renderOptions, state).then(htmlWithState => {
      res.setHeader('Cache-Control', 'public, max-age=60') // 1min for testing
      res.send(htmlWithState)
    })
  })
})

export default app
