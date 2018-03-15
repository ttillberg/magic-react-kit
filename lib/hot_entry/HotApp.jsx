import React from 'react'
import { hot } from 'react-hot-loader'

try {
  var App = require('__APP_ENTRY__').default
} catch (e) {
  console.log(
    "Couldn't locate main App entry point, make sure the --path points to the source folder"
  )
  process.exit(1)
}

export default hot(module)(App)
