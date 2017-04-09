const merge = require('webpack-merge')
const base = require('../config.base')

module.exports = merge(base, {
  env: 'production',
  port: 8085
})
