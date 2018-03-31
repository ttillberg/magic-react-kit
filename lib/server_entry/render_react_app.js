import React from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'

let App,
  app_error = false

try {
  App = require('../hot_entry/HotApp').default
} catch (e) {
  app_error = e
}

import configureStore from '__STORE_ENTRY_ALIAS__'

const defaultOptions = {
  scriptHref: '/client.js',
  stylesHref: '/styles.css',
}

const BYPASS_SSR = false

export default function render(url, options, state) {
  options = {
    ...defaultOptions,
    ...options,
  }
  const { scriptHref, stylesHref } = options

  if (BYPASS_SSR || app_error) {
    return new Promise((resolve, reject) => {
      if (app_error) {
        reject(app_error)
      } else {
        resolve(
          renderDom({
            scriptHref,
            stylesHref,
            application: !app_error
              ? ''
              : `<pre style="color: red;">Error rendering application: 
            ${app_error.stack}
          </pre>`,
          })
        )
      }
    })
  }

  const store = configureStore(state)

  return new Promise((success, error) => {
    const fetchStore = !state
    let application
    try {
      application = renderToString(
        <App
          url={url}
          store={store}
          storeReadyCallback={fetchStore && success}
          storeErrorCallback={fetchStore && error}
        />
      )
    } catch (e) {
      throw e
    }

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
<html ${htmlAttributes || ''}>
  <meta charset="utf-8"/>
	<head>
		${head || ''}
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
