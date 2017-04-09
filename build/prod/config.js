const path = require('path')
const merge = require('webpack-merge')
const base = require('../config.base')

module.exports = merge(base, {
  env: 'production',
  builds: {
    // ES
    'es': {
      entry: path.resolve(__dirname, './dist-esm.js'),
      dest: path.resolve(__dirname, '../../dist/js/vuikit.esm.js'),
      format: 'es'
    },
    // CommonJS
    'cjs': {
      entry: path.resolve(__dirname, './dist.js'),
      dest: path.resolve(__dirname, '../../dist/js/vuikit.common.js'),
      format: 'cjs'
    },
    // Browser
    'umd': {
      entry: path.resolve(__dirname, './dist.js'),
      dest: path.resolve(__dirname, '../../dist/js/vuikit.js'),
      format: 'umd',
      env: 'development'
    },
    // production build (Browser)
    'umd-production': {
      entry: path.resolve(__dirname, './dist.js'),
      dest: path.resolve(__dirname, '../../dist/js/vuikit.min.js'),
      format: 'umd',
      env: 'production',
      sourceMap: true
    }
  }
})
