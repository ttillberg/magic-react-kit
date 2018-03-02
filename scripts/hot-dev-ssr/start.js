/*@flow*/
var paths = require('../../config/paths')
var webpack = require('webpack')
var path = require('path')
var handleWebpackResult = require(paths.resolveOwn('util/handleWebpackResult'))
var config = require('./config/webpack.serve.config')

const spawn = require('cross-spawn')

const DEBUG = process.env.DEBUG

build().then(() => {
  spawn('node', ['./server/build/server_reloader_compiled.js'], {
    stdio: 'inherit',
    cwd: __dirname,
  })

  spawn('node', [paths.resolveOwn('scripts/hot-dev-frontend/start.js')], {
    stdio: 'inherit',
  })
})

function build() {
  var compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.watch(
      {
        poll: 1000,
        ignored: 'node_modules',
      },
      handleWebpackResult(resolve, reject)
    )
  })
}
