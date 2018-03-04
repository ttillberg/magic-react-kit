#!/usr/local/bin/node
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const paths = require('../common/paths')
const argv = require('minimist')(process.argv)
const appConfig = require(paths.resolveCommon('register_options'))

const path = require('path')
const rimraf = require('rimraf')
const spawn = require('cross-spawn')
const buildClient = require('./client/client.build')
const buildServer = require('./server/server.build')

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
