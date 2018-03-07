import { run, read, remove } from '@miljan/build'
import { compile, buildIndex } from './util/icons'

run(async () => {
  const tmpl = await read('src/file.tmpl')
  await remove('src/uikit')

  // compile uikit icons
  await compile({
    tmpl,
    src: '../../node_modules/uikit/src/images/icons/*.svg',
    dest: 'src/uikit'
  })

  await buildIndex({
    src: 'src/uikit/*.js',
    dest: 'src/index.js'
  })
})
