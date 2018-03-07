#!/usr/local/bin/node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

const spawn = require('cross-spawn')

var scripts = {
  client: require.resolve('../scripts/dev_client/dev_client.start'),
  start: require.resolve('../scripts/dev_server/dev_server.start'),
  build: require.resolve('../scripts/prod_server/prod_server.start'),
}

var argv = require('minimist')(process.argv)
var scriptName = argv._ && argv._[2]
var script = scripts[scriptName]

if (!script) {
  console.log('Unknown script "' + scriptName + '".')
  process.exit(1)
}

var args = process.argv.slice(1 + process.argv.indexOf(scriptName))

let result = spawn.sync('node', [script].concat(args), {
  stdio: 'inherit',
})

if (result && result.signal) {
  if (result.signal === 'SIGKILL') {
    console.log(
      'The build failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
    )
  } else if (result.signal === 'SIGTERM') {
    console.log(
      'The build failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
    )
  }
  process.exit(1)
}

result && process.exit(result.status)
