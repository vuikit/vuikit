import path from 'path'
import globby from 'globby'
import rollup from 'rollup'
import buble from 'rollup-plugin-buble'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'
import replaceInFile from 'replace-in-file'
import nodeResolve from 'rollup-plugin-node-resolve'

import { run, remove, write } from '@miljan/build'

run(async () => {
  let resources

  await remove(['assets', 'components', 'directives', 'mixins', 'utils'])

  // COMPONENTS / DIRECTIVES
  resources = await globby('src/{components,directives}/*/index.js')
  await Promise.all(resources.map(async input => {
    const dirname = path.dirname(input).replace('src/', '')
    const [folder, name] = dirname.split('/')

    return compile(input, `${folder}/${name}.js`)
  }))

  // ASSETS / MIXINS
  resources = await globby('src/{assets,mixins}/*.js')
  await Promise.all(resources.map(async input => {
    const name = path.basename(input, '.js')
    const folder = path.dirname(input).replace('src/', '')

    return compile(input, `${folder}/${name}.js`)
  }))

  await replaceInFile({
    files: 'mixins/*.js',
    from: /vuikit\/core\/src/g,
    to: 'vuikit/core'
  })

  // UTILS
  resources = await globby('src/utils/*.js')
  await Promise.all(resources.map(async input => {
    const basename = path.basename(input)
    return compile(input, `utils/${basename}`, {
      external (id) {
        const isRelative = /\.\//
        const isDateFns = /date-fns/

        if (id === input || isDateFns.test(id)) {
          return false
        }

        // consider all relative as external
        return !isRelative.test(id)
      }
    })
  }))

})

async function compile (input, dest, opts = {}) {
  const config = {
    input,
    output: {
      format: 'es'
    },
    external: id => /@vuikit\/core/.test(id),
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true
      }),
      commonjs(),
      buble(),
      cleanup()
    ],
    ...opts
  }

  const bundle = await rollup.rollup(config)
  const { code } = await bundle.generate(config.output)

  await write(dest, code, { log: true })
}
