const pkg = require('../package.json')

module.exports = {
  env: '',
  assetsRoot: '/',
  assetsPublicPath: '/',
  assetsSubDirectory: 'static',
  // productionSourceMap: false,
  banner: `
    /*!
    * ${pkg.name} ${pkg.version} (${pkg.git})
    * (c) ${new Date().getFullYear()} ${pkg.author.name}
    * Released under the ${pkg.license} License.
    */
  `
}
