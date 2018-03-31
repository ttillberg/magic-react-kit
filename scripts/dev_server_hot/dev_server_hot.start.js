process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.traceDeprecation = true

require('./server/server')
