import http from 'http'
import path from 'path'
import fs from 'fs'
import express from 'express'
import React from 'react'
import Helmet from 'react-helmet'
import { renderToString } from 'react-dom/server'
import App from 'main'
// import { resolveApp, resolveOwn } from '../../../config/paths'

var appDirectory = fs.realpathSync(process.cwd())

startServer()

function startServer() {
  const app = express()
  // var assetPath = path.join(__dirname, 'assets')
  app.use(express.static('assets'))
  app.get('*', (req, res) => {
    var html = render(req)
    res.send(html)
  })
  const server = http.createServer(app)
  server.listen(8080)
}

function render(req) {
  const application = renderToString(<App url={req.url} />)
  const helmet = Helmet.renderStatic()
  const title = helmet.title.toString()
  const meta = helmet.meta.toString()
  const link = helmet.link.toString()

  return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
	<head>
		${[title, meta, link].join('')}  
	</head>
	<body>
		<div id="root">${application}</div>
		<script src="/client.js"></script>
	</body>
</html>`
}
