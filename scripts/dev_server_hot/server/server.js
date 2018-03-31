const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')

const config = require('../webpack.config.js')

const app = express()

const compiler = webpack(config)

app.use(
  webpackDevMiddleware(compiler, {
    serverSideRender: true,
    publicPath: config[0].output.publicPath,
    stats: 'errors-only',
  })
)

const clientCompiler = compiler.compilers.find(compiler => compiler.name === 'client')
app.use(webpackHotMiddleware(clientCompiler))
app.use(webpackHotServerMiddleware(compiler))

app.listen(3000, () => {
  console.log('Server started: http://localhost:3000/')
})
