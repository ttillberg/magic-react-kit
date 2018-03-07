import React from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import App from '../hot_entry/HotApp'

export default function render(req, scriptHref, cb, state) {
  const application = renderToString(<App url={req.url} onReady={cb} prefetchedState={state} />)
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
    ${(state && `<script>window.__PREFETCHED_STATE__=${JSON.stringify(state)}</script>`) || ''}
		<script src="${scriptHref}"></script>
	</body>
</html>`
}
