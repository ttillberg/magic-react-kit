const { resolveApp } = require('../scripts/paths')
const packageData = require(resolveApp('package.json'))

const defaultConfig = {
  name: packageData.name,
  version: packageData.version,
  src: 'src',
  storeEntry: '@/store/configure_store',
  appEntry: '@/App',
}
const config = packageData.magic || {}

module.exports = {
  ...defaultConfig,
  ...config,
}
