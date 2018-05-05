import path from 'path'
import globby from 'globby'
import rollup from 'rollup'
import buble from 'rollup-plugin-buble'
import cleanup from 'rollup-plugin-cleanup'

import { run, remove, write } from '@miljan/build'

run(async () => {
  await remove('lib')

  let resources = await globby('src/*.js')

  return Promise.all(resources.map(async input => {
    const basename = path.basename(input)
    return compile(input, `${basename}`, {
      external (id) {
        // consider all as external
        return id !== input
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
    external: opts.external || (id => {
      const isRelative = /\.\//

      if (id === input || isRelative.test(id)) {
        return false
      }

      const dirname = path.dirname(input)
      const isInternal = RegExp(`${dirname}/`)

      return !isInternal.test(id) // eslint-disable-line
    }),
    plugins: [
      buble(),
      cleanup()
    ]
  }

  const bundle = await rollup.rollup(config)
  const { code } = await bundle.generate(config.output)

  await write(dest, code, { log: true })
}
