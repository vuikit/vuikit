import path from 'path'
import globby from 'globby'
import rollup from 'rollup'
import buble from 'rollup-plugin-buble'
import cleanup from 'rollup-plugin-cleanup'

import { run, remove, write } from '@miljan/build'

run(async () => {
  await remove(['components', 'directives', 'mixins'])

  let resources

  resources = await globby('src/{components,directives}/*/index.js')
  await Promise.all(resources.map(async input => {
    const dirname = path.dirname(input).replace('src/', '')
    const [folder, name] = dirname.split('/')

    return compile(input, `${folder}/${name}.js`)
  }))

  resources = await globby('src/{assets,mixins}/*.js')
  return Promise.all(resources.map(async input => {
    const name = path.basename(input, '.js')
    const folder = path.dirname(input).replace('src/', '')

    return compile(input, `${folder}/${name}.js`)
  }))
})

async function compile (input, dest, opts = {}) {
  const config = {
    input,
    output: {
      format: 'es'
    },
    external: id => /@vuikit\/utils/.test(id),
    plugins: [
      buble(),
      cleanup()
    ]
  }

  const bundle = await rollup.rollup(config)
  const { code } = await bundle.generate(config.output)

  await write(dest, code, { log: true })
}
