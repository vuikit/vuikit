import pkg from '../package.json'
import { run, banner } from '@miljan/build'

const Copyright = `/**
 * Vuikit - ${pkg.name} ${pkg.version}
 * (c) 2018 ${pkg.author.name}
 * @license ${pkg.license}
**/

/* Substantial part of the code is adapted from UIkit,
  Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com */`

run(async () => {
  await banner('dist/**/*.css', Copyright)
})
