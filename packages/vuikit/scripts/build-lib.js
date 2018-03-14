import path from 'path'
import globby from 'globby'
import rollup from './util/rollup'
import replaceInFile from 'replace-in-file'

import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import cleanup from 'rollup-plugin-cleanup'

import { run, task, remove, write, banner } from '@miljan/build'

import pkg from '../package.json'

const bannerText = `/**
 * Vuikit ${pkg.version}
 * (c) 2018 Miljan Aleksic
 * @license ${pkg.license}
 */`

run(async () => {
  await remove('lib')

  await task('Compile Components', async () => {
    let resources = await globby('src/components/*/index.js')

    return Promise.all(resources.map(async input => {
      const basename = path.dirname(input).split('/').pop()
      return compile(input, `lib/${basename}.js`)
    }))
  })

  await task('Compile Directives', async () => {
    let resources = await globby('src/directives/*/index.js')

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
      /vuikit\/src\/components/g,
      /vuikit\/src\/directives/g,
      /vuikit\/src/g
    ],
    to: '.'
  })

  await banner('lib/*.js', bannerText)
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
