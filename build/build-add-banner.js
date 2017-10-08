import lumpit from '@lump/it'
import pkg from '../package.json'
import bannerit from '@lump/banner'

const banner = `/*
 * Vuikit ${pkg.version}
 * (c) ${(new Date()).getFullYear()} Miljan Aleksic
 * Released under the ${pkg.license} License.
*/`

lumpit(async () => {
  await bannerit('dist/*.js', banner)
})
