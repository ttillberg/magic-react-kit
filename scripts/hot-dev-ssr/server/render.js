import React from 'react'
import { renderToString } from 'react-dom/server'
import App from 'Main'
import Helmet from 'react-helmet'

export default function render(req, scriptHref) {
  const application = renderToString(<App url={req.url} />)
  const helmet = Helmet.renderStatic()
  const title = helmet.title.toString()
  const meta = helmet.meta.toString()
  const link = helmet.link.toString()

  return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
	<head>
		${[title, meta, link].join('')}  
    <link rel="stylesheet" href="/styles.css">
	</head>
	<body>
		<div id="root">${application}</div>
		<script src="${scriptHref}"></script>
	</body>
</html>`
}
