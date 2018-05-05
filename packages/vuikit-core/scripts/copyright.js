import pkg from '../package.json'
import { run, banner } from '@miljan/build'

const Copyright = `/**
 * Vuikit Core - ${pkg.name} ${pkg.version}
 * (c) 2018 ${pkg.author.name}
 * @license ${pkg.license}
**/`

run(async () => {
  await banner('dist/**/*.js', Copyright)
})
