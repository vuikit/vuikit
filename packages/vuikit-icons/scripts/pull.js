import { run, read, remove } from '@miljan/build'
import { compile, buildIndex } from './util/icons'

run(async () => {
  const tmpl = await read('src/icon.tmpl')
  await remove('src/icons')

  // compile uikit icons
  await compile({
    tmpl,
    src: '../../node_modules/uikit/src/images/icons/*.svg',
    dest: 'src/icons'
  })

  await buildIndex({
    src: 'src/icons/*.vue',
    dest: 'src/icons/index.js'
  })
})
