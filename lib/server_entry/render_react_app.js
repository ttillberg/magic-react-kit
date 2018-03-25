import React from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import App from '../hot_entry/HotApp'

import configureStore from '__STORE_ENTRY__'

const defaultOptions = {
  scriptHref: '/client.js',
  stylesHref: '/styles.css',
}

export default function render(url, options, state) {
  options = {
    ...defaultOptions,
    ...options,
  }

  const store = configureStore(state)
  const { scriptHref, stylesHref } = options

  return new Promise((success, error) => {
    const fetchStore = !state
    const application = renderToString(
      <App
        url={url}
        store={store}
        storeReadyCallback={fetchStore && success}
        storeErrorCallback={fetchStore && error}
      />
    )

    const helmet = Helmet.renderStatic()

    const title = helmet.title.toString()
    const meta = helmet.meta.toString()
    const link = helmet.link.toString()
    const head = [title, meta, link].join('')

    const htmlAttributes = helmet.htmlAttributes.toString()

    if (state)
      success(
        renderDom({
          application,
          state,
          htmlAttributes,
          head,
          scriptHref,
          stylesHref,
        })
      )
  })
}

const renderDom = ({
  application,
  state,
  htmlAttributes,
  head,
  scriptHref,
  stylesHref,
}) => `<!doctype html>
<html ${htmlAttributes}>
  <meta charset="utf-8"/>
	<head>
		${head}
    ${(stylesHref && `<link rel="stylesheet" href=${stylesHref} />`) || ''}
	</head>
	<body>
		<div id="root">${application || ''}</div>
  ${(state &&
    `<script>window.__PREFETCHED_STATE__=${JSON.stringify(state).replace(
      /[\u007F-\uFFFF]/g,
      function(chr) {
        return '\\u' + ('0000' + chr.charCodeAt(0).toString(16)).substr(-4)
      }
    )}</script>`) ||
    ''}  
		<script src="${scriptHref}"></script>
	</body>
</html>`
