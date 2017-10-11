import lumpit from '@lump/it'
import pkg from '../package.json'
import bannerit from '@lump/banner'

const banner = `/**
 * Vuikit ${pkg.version}
 * (c) 2017 Miljan Aleksic
 * @license ${pkg.license}
 */`

lumpit(async () => {
  await bannerit('dist/*.js', banner)
})
