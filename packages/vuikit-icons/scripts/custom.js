import { compile } from './util/icons'
import { run, read } from '@miljan/build'

run(async () => {
  const tmpl = await read('src/icon.tmpl')

  // compile custom icons
  await compile({
    tmpl,
    src: 'custom/*.svg',
    dest: 'custom'
  })
})
