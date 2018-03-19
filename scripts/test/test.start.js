const path = require('path')

process.env.NODE_ENV = 'test'
process.env.BABEL_ENV = 'test'

const jest = require('jest')
const config = {
  moduleDirectories: ['node_modules', 'src'],

  moduleNameMapper: {
    // "\\.(jpg|jpeg|png|svg)$": "./src/config/fileMock.js",
    '\\.(css|scss)$': 'identity-obj-proxy',
  },

  transform: {
    '\\.jsx?$': path.resolve(__dirname, 'jest-transform.js'),
  },
}

var args = process.argv.slice(2)
jest.run(['--no-cache', '--config', JSON.stringify(config)].concat(args))
