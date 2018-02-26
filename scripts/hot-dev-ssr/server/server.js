import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import App from 'Main'
import Helmet from 'react-helmet'

const app = express()

app.get('*', (req, res) => {
  let application = renderToString(<App url={req.url} />)
  const helmet = Helmet.renderStatic()
  let title = helmet.title.toString()
  let meta = helmet.meta.toString()
  let link = helmet.link.toString()
  let html = `<!doctype html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      ${[title, meta, link].join('')}  
    </head>
    <body>
      <div id="root">${application}</div>
      <script src="http://localhost:3000/static/bundle.js"></script>
    </body>
  </html>`

  res.send(html)
})

export default app
