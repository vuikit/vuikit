import path from 'path'
import pkg from '../package.json'

import less from '@lump/less'
import bannerit from '@lump/banner'

const banner = `/**
 * Vuikit Theme ${pkg.version}
 * (c) 2017 Miljan Aleksic
 * @license ${pkg.license}
 */`

const lessOptions = {
  log: true,
  relativeUrls: true,
  paths: [
    path.resolve(__dirname, '..', 'src'),
    path.resolve(__dirname, '..', '..', '..', 'node_modules')
  ]
}

;(async () => {

  await less({
    src: 'src/theme.less',
    dest: 'dist/vuikit.css',
    options: {
      ...lessOptions
    }
  })

  await less({
    src: 'src/theme.less',
    dest: 'dist/vuikit.min.css',
    options: {
      ...lessOptions,
      minify: true,
      sourceMap: true
    }
  })

  await bannerit('dist/*.css', banner)

})()
