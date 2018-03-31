/*@flow*/
declare var __PROJECT_NAME__: string
declare var __BUILD_VERSION__: string
declare var __STORE_ENTRY_ALIAS__: string
declare var __IS_DEV__: boolean
declare var __DATE__: number

import React from 'react'
import { hydrate } from 'react-dom'
import HotApp from '../hot_entry/HotApp'

// $FlowFixMe
import configureStore from '__STORE_ENTRY_ALIAS__'

const root = document.getElementById('root')

console.log(
  `%c${__PROJECT_NAME__}
Build ${__BUILD_VERSION__} - ${__IS_DEV__ ? 'Dev' : 'Prod'}\n${new Date(__DATE__).toString()}`,
  'padding: 50px 0; color:black: #010101; font-size: 12px; font-family: Helvetica; font-weight: 800; line-height: 1.4em;'
)

const store = configureStore(window.__PREFETCHED_STATE__)

hydrate(<HotApp store={store} />, root)
