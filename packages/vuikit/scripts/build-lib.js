import path from 'path'
import globby from 'globby'
import rollup from './util/rollup'
import replaceInFile from 'replace-in-file'

import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import cleanup from 'rollup-plugin-cleanup'

import { run, task, remove, write, banner } from '@miljan/build'

import Copyright from './_copyright'

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
    let resources = await globby('src/icons/*.js')

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

  await banner('lib/*.js', Copyright)
})

async function compile (input, dest, opts = {}) {
  const config = {
    input,
    output: {
      format: 'es'
    },
    // external: ['vuikit/src/util'],
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

  config.plugins.push(replace({
    exclude: 'node_modules/**',
    'process.env.NODE_ENV': JSON.stringify('development')
  }))

  const { code } = await rollup(config)
  await write(dest, code, { log: true })
}
