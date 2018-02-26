import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import App from 'Main'

const app = express()

app.get('*', (req, res) => {
  let application = renderToString(<App url={req.url} />)
  let html = `<!doctype html>
  <html class="no-js" lang="en-gb">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Server rendered</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <div id="root">${application}</div>
      <script src="http://localhost:3000/static/bundle.js"></script>
    </body>
  </html>`

  res.send(html)
})

export default app
