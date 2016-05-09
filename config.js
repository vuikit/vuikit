// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var version = require('./package.json').version

module.exports = {
  build: {
    index: path.resolve(__dirname, 'prod/index.html'),
    assetsRoot: path.resolve(__dirname, 'prod'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dist: {
    assetsRoot: path.resolve(__dirname, 'dist'),
    productionSourceMap: true
  },
  lib: {
    assetsRoot: path.resolve(__dirname, 'lib'),
    productionSourceMap: true
  },
  dev: {
    port: 8080,
    proxyTable: {}
  },
  banner:
    '/*!\n' +
    ' * Vuikit v' + version + ' (https://github.com/joolanders/vuikit)\n' +
    ' * (c) ' + new Date().getFullYear() + ' ZOOlanders\n' +
    ' * Released under the MIT License.\n' +
    ' */'
}
