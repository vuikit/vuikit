import { run, read, remove } from '@miljan/build'
import { compile, buildExportIndex } from './util/icons'

run(async () => {
  const tmpl = await read('build/file.tmpl')
  await remove('lib')

  // compile uikit icons
  await compile({
    tmpl,
    src: '../../node_modules/uikit/src/images/icons/*.svg',
    dest: 'lib'
  })

  await buildExportIndex({
    src: 'lib/*.js',
    dest: 'lib/_import.js'
  })

  // compile custom icons
  await remove('custom/_result')
  await compile({
    tmpl,
    src: 'custom/*.svg',
    dest: 'custom/_result'
  })
})
