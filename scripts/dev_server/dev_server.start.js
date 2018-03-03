#!/usr/local/bin/node
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.BUILD_TARGET = 'node'

const paths = require('../../config/paths')
const webpack = require('webpack')
const rimraf = require('rimraf')
const path = require('path')
const spawn = require('cross-spawn')

const create_webpack_result_handler = require(paths.resolveOwn('util/webpack_output_handler'))
const config = require('./dev_server.webpack.config')

const DEBUG = process.env.DEBUG

start()

function start() {
  cleanup()
    .then(build)
    .then(start_servers)
}

function cleanup() {
  console.log('clean up')
  return new Promise((resolve, reject) => {
    rimraf(path.resolve(__dirname, 'dist'), resolve)
  })
}

function build() {
  console.log('build dev server')
  var compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.watch(
      {
        poll: 1000,
        ignored: 'node_modules',
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
  const script = paths.resolveOwn('scripts/dev_server/server_dist/dev_server_compiled.js')
  spawn('node', [script], {
    stdio: 'inherit',
  })
}

function start_dev_client() {
  const script = paths.resolveOwn('scripts/dev_client/dev_client.start')
  spawn('node', [script], {
    stdio: 'inherit',
  })
}
