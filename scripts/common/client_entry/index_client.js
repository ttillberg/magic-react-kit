/*@flow*/
import React from 'react'
import { hydrate } from 'react-dom'
import App from 'App'

const root = document.getElementById('root')

console.log(
  `%cProject Name%c

${__BUILD_VERSION__} - ${__IS_DEV__ ? 'Dev' : 'Prod'}\r
${new Date(__DATE__)}\r\n\r\n`,
  'font-size: 18px; font-family: Helvetica; font-weight: 800; line-height: 2em;',
  'font-size: 9px; font-family: Helvetica; font-weight: 400; line-height: 1.4em;'
)

hydrate(<App />, root)
