import { compile } from './util/icons'
import { run, read, remove } from '@miljan/build'

run(async () => {
  const tmpl = await read('build/file.tmpl')

  // compile custom icons
  await remove('custom/_result')
  await compile({
    tmpl,
    src: 'custom/*.svg',
    dest: 'custom/_result'
  })
})
