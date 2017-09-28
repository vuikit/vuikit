const pkg = require('../../package.json')

const task = require('@lump/task')
const bannerit = require('@lump/banner')

const banner = `/*
 * Vuikit ${pkg.version}
 * (c) ${(new Date()).getFullYear()} Miljan Aleksic
 * Released under the ${pkg.license} License.
*/`

module.exports = async () => {
  await task('Add banner', () => bannerit('dist/*.js', banner))
}
