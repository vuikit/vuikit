import path from 'path'
import pkg from '../package.json'
import { run, remove, task, banner, less, minifyCSS } from '@miljan/build'

const Copyright = `/**
 * Vuikit Theme ${pkg.version}
 * (c) 2018 Miljan Aleksic
 * @license ${pkg.license}
**/

/* Substantial part of this code is adapted from UIkit,
  Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com */`

run(async () => {
  await remove('dist')

  await task('Compile', async () => {
    await less({
      src: 'src/index.less',
      dest: 'dist/vuikit.css',
      options: {
        relativeUrls: true,
        paths: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../../../node_modules')
        ]
      }
    })

    await minifyCSS({
      src: 'dist/vuikit.css',
      dest: 'dist/vuikit.min.css',
      options: {
        sourceMap: true
      }
    })
  })

  await banner('dist/*.css', Copyright)
})
