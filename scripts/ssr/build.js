const path = require('path')
const rimraf = require('rimraf')
const spawn = require('cross-spawn')
const buildClient = require('./build-client')
const buildServer = require('./build-server')
const paths = require('../../config/paths')
const handleWebpackResult = require(paths.resolveOwn('util/handleWebpackResult'))

console.log('=> Clean up build dir')

rimraf.sync(paths.resolveApp('build'))

buildClient()
  .then(() => {
    return buildServer()
  })
  .then(() => {
    return spawn('node', ['.'], {
      stdio: 'inherit',
      cwd: paths.resolveApp('build'),
    })
  })