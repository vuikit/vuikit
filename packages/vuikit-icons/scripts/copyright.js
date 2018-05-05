import pkg from '../package.json'
import { run, banner } from '@miljan/build'

const Copyright = `/**
 * Vuikit - ${pkg.name} ${pkg.version}
 * (c) 2018 ${pkg.author.name}
 * @license ${pkg.license}
**/

/* Icons source code is part of the UIkit icons collection,
  Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com */`

run(async () => {
  await banner(['dist/*.js', '*.js'], Copyright)
})
