import path from 'path'
import globby from 'globby'

import less from '@lump/less'
import copy from '@lump/copy'
import write from '@lump/write'
import remove from '@lump/remove'
import minify from '@lump/minify'
import rollup from '@lump/rollup'
import bannerize from '@lump/banner'
import copyRecursive from '@lump/copy-recursive'

import pkg from '../package.json'
import rollupConfig from '../rollup.config'

const banner = `/**
 * Vuikit ${pkg.version}
 * (c) 2018 Miljan Aleksic
 * @license ${pkg.license}
 */`

;(async () => {
  await remove('build/vuikit')

  // copy project files
  await Promise.all([
    copy('packages/vuikit/*.{md,json}', 'build/vuikit'),
    copyRecursive('packages/vuikit/core', 'build/vuikit/core', [
      '!**/__*__/*',
      '!**/__*__'
    ]),
    copyRecursive('packages/vuikit/src', 'build/vuikit/src', [
      '!**/__*__/*',
      '!**/__*__'
    ])
  ])

  // compile as individual resources
  await compileIndividual([
    'packages/vuikit/src/*/*/index.js',
    '!packages/vuikit/src/*/datepicker/index.js'
  ], 'build/vuikit')

  // compile ES index
  await compile({
    input: 'packages/vuikit/src/vuikit.esm.js',
    output: {
      format: 'es'
    }
  }, 'build/vuikit/dist/vuikit.esm.js')

  // compile CJS index
  await compile({
    input: 'packages/vuikit/src/vuikit.cjs.js',
    output: {
      format: 'cjs'
    }
  }, 'build/vuikit/dist/vuikit.cjs.js')

  // compile dist as UMD
  await compile({
    input: 'packages/vuikit/src/vuikit.cjs.js',
    output: {
      name: 'Vuikit',
      format: 'umd'
    },
    external: []
  }, 'build/vuikit/dist/vuikit.js')

  await minify('build/vuikit/dist/vuikit.js', {
    sourceMap: true,
    log: true
  })

  // compile theme
  await compileLess({
    src: 'packages/vuikit/src/theme/index.less',
    dest: 'build/vuikit/dist/vuikit.css'
  })

  // compile theme minimized
  await compileLess({
    src: 'packages/vuikit/src/theme/index.less',
    dest: 'build/vuikit/dist/vuikit.min.css',
    options: {
      minify: true,
      sourceMap: true
    }
  })

  await bannerize('build/vuikit/**/*.{js,css}', banner)
})()

async function compileIndividual (paths, dest) {
  const resources = globby.sync(paths)

  await Promise.all(resources.map(_compile))

  async function _compile (input) {
    const dirname = path.dirname(input)
    const basename = dirname.split('/').pop()

    await compile({
      input,
      output: {
        format: 'es'
      },
      external: id => id.match(/@?vuikit\/core/)
    }, `${dest}/${basename}.js`)
  }
}

async function compile (config, dest) {
  config = {
    ...rollupConfig,
    ...config
  }

  const { code } = await rollup(config)
  await write(`${dest}`, code, { log: true })
}

async function compileLess ({ src, dest, options }) {
  await less({
    src,
    dest,
    options: {
      log: true,
      relativeUrls: true,
      paths: [
        path.resolve(__dirname, '../src/theme'),
        path.resolve(__dirname, '../../../node_modules')
      ],
      ...options
    }
  })
}
