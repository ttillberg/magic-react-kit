#!/usr/local/bin/node
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const paths = require('../common/paths')
const argv = require('minimist')(process.argv)
const appConfig = require(paths.resolveCommon('register_options'))

const path = require('path')
const rimraf = require('rimraf')
const fs = require('fs-extra')

const spawn = require('cross-spawn')
const buildClient = require('./client/client.build')
const buildServer = require('./server/server.build')
const cleanUp = () =>
  new Promise((success, error) => {
    rimraf(paths.resolveApp('server_dist'), (res, err) => {
      if (err) {
        error(err)
      } else {
        success(res)
      }
    })
  })

new Promise(next => next())
  .then(log('clean up'))
  .then(cleanUp)
  .then(log('build client'))
  .then(buildClient)
  .then(log('build ssr'))
  .then(buildServer)
  .then(log('copy server code'))
  .then(() =>
    fs.copy(
      path.join(__dirname, 'server/server_src/server.js'),
      paths.resolveApp('server_dist/server.js')
    )
  )
  .then(log('ready ✔︎'))
  .then(() => {
    if (argv.start) {
      return spawn('node', ['./server.js'], {
        stdio: 'inherit',
        cwd: paths.resolveApp('server_dist'),
      })
    }
  })
  .catch(err => {
    console.log(err)
  })

function log(message) {
  return () =>
    new Promise(next => {
      console.log(message)
      next()
    })
}
