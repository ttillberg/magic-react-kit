#!/usr/local/bin/node
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const paths = require('../../config/paths')
const argv = require('minimist')(process.argv)
const appConfig = require(paths.resolveOwn('util/configure_constants'))

const path = require('path')
const rimraf = require('rimraf')
const spawn = require('cross-spawn')
const buildClient = require('./client.build')
const buildServer = require('./server.build')

console.log('Clean up')

rimraf.sync(paths.resolveApp('server_dist'))

buildClient()
  .then(buildServer)
  .then(() => {
    console.log('Server compiled')
    if (argv.start) {
      return spawn('node', ['./server_compiled'], {
        stdio: 'inherit',
        cwd: paths.resolveApp('server_dist'),
      })
    }
  })
  .catch(err => {
    console.log(err)
  })
