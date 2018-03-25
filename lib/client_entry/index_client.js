/*@flow*/
import React from 'react'
import { hydrate } from 'react-dom'
import HotApp from '../hot_entry/HotApp'
import configureStore from '__STORE_ENTRY__'

const root = document.getElementById('root')

console.log(
  `%c${__PROJECT_NAME__}
Build ${__BUILD_VERSION__} - ${__IS_DEV__ ? 'Dev' : 'Prod'}\n${new Date(__DATE__)}`,
  'padding: 50px 0; color:black: #010101; font-size: 12px; font-family: Helvetica; font-weight: 800; line-height: 1.4em;'
)

const store = configureStore(window.__PREFETCHED_STATE__)

hydrate(<HotApp store={store} />, root)
