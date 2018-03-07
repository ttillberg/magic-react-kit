#!/usr/local/bin/node
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.BUILD_TARGET = 'node'

const { resolveApp, resolveOwn, resolveCommon } = require('../common/paths')
const webpack = require('webpack')
const rimraf = require('rimraf')
const path = require('path')
const spawn = require('cross-spawn')

const create_webpack_result_handler = require(resolveCommon('webpack_output_handler'))
const config = require('./config/dev_server.webpack.config')

const DEBUG = process.env.DEBUG

start()

function start() {
  cleanup()
    .then(build)
    .then(start_servers)
    .then(() => {
      console.log('\n\nReady')
    })
}

function cleanup() {
  console.log('clean up')
  return new Promise((resolve, reject) => {
    rimraf(path.resolve(__dirname, 'server_dist'), resolve)
  })
}

function build() {
  console.log('build dev server')
  var compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.watch(
      {
        ignored: /node_modules/,
      },
      create_webpack_result_handler(resolve, reject)
    )
  })
}

function start_servers() {
  console.log('starting servers...')
  start_dev_server()
  start_dev_client()
}

function start_dev_server() {
  console.log('starting dev server')
  const script = resolveOwn('scripts/dev_server/server_dist/dev_server_compiled.js')
  return spawnPromise(script)
}

function start_dev_client() {
  console.log('starting dev client')
  const script = resolveOwn('scripts/dev_client/dev_client.start')
  return spawnPromise(script)
}

function spawnPromise(script) {
  return new Promise((success, fail) => {
    spawn('node', [script], {
      stdio: 'inherit',
      // ['pipe', 'inherit', 'pipe', 'ipc'],
    })
    // .on('message', function(data) {
    // .on('error', function(e) {
    // .on('exit', function(e) {
  })
}
