import path from 'path'
import globby from 'globby'
import rollup from './util/rollup'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import cleanup from 'rollup-plugin-cleanup'
import replaceInFile from 'replace-in-file'
import nodeResolve from 'rollup-plugin-node-resolve'

import { run, task, remove, write } from '@miljan/build'

process.env.NODE_ENV = 'production'

run(async () => {
  await remove('lib')

  await task('Compile Library', async () => {
    let resources = await globby('src/library/*/index.js')

    return Promise.all(resources.map(async input => {
      const basename = path.dirname(input).split('/').pop()
      return compile(input, `lib/${basename}.js`)
    }))
  })

  await task('Compile Core', async () => {
    let resources = await globby('src/core/*/index.js')

    return Promise.all(resources.map(async input => {
      const basename = path.dirname(input).split('/').pop()
      return compile(input, `lib/core/${basename}.js`)
    }))
  })

  await task('Compile Util', async () => {
    let resources = await globby('src/util/*.js')

    return Promise.all(resources.map(async input => {
      const basename = path.basename(input)
      return compile(input, `lib/util/${basename}`, {
        external (id) {
          // consider all as external
          return id !== input
        }
      })
    }))
  })

  await task('Compile Mixins', async () => {
    let resources = await globby('src/mixins/*.js')

    return Promise.all(resources.map(async input => {
      const basename = path.basename(input)
      return compile(input, `lib/mixins/${basename}`)
    }))
  })

  await task('Compile Icons', async () => {
    let resources = await globby('src/icons/*.vue')

    return Promise.all(resources.map(async input => {
      const basename = path.basename(input)
      return compile(input, `lib/icons/${basename}`)
    }))
  })

  await replaceInFile({
    files: 'lib/*/*.js',
    from: /vuikit\/src/g,
    to: '..'
  })

  await replaceInFile({
    files: 'lib/*.js',
    from: [
      /vuikit\/src\/library/g,
      /vuikit\/src/g
    ],
    to: '.'
  })
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
      nodeResolve({
        extensions: [ '.js', '.json', '.vue' ]
      }),
      vue(),
      buble(),
      cleanup()
    ]
  }

  const { code } = await rollup(config)
  await write(dest, code, { log: true })
}
