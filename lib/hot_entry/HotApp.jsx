import React from 'react'
import { hot } from 'react-hot-loader'

var App
try {
  App = require('__APP_ENTRY_ALIAS__').default
} catch (e) {
  throw e
}

export default hot(module)(App)
