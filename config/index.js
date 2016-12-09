// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var version = require('../package.json').version

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../docs/index.html'),
    assetsRoot: path.resolve(__dirname, '../docs'),
    distRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    banner:
      '/*!\n' +
      ' * Vuikit v' + version + ' (https://github.com/vuikit/vuikit)\n' +
      ' * (c) ' + new Date().getFullYear() + ' ZOOlanders\n' +
      ' * Released under the MIT License.\n' +
      ' */'
  },
  dev: {
    env: require('./dev.env'),
    port: 8085,
    proxyTable: {}
  }
}
