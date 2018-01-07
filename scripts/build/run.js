#!/usr/bin/env node
'use strict'

import copy from '@lump/copy'
import remove from '@lump/remove'
import minify from '@lump/minify'
import bannerize from '@lump/banner'
import copyRecursive from '@lump/copy-recursive'

import { compileSingle, compileCollective, compileLess } from './util'

(async () => {
  // start clean
  await remove('build')

  // copy project files
  Promise.all([
    copy('packages/vuikit/*.{md,json}', 'build'),
    copyRecursive('packages/vuikit/core', 'build/core', [
      '!**/__*__/*',
      '!**/__*__'
    ]),
    copyRecursive('packages/vuikit/src', 'build/src', [
      '!**/__*__/*',
      '!**/__*__'
    ])
  ])

  // compile single CJ resources
  await compileSingle([
    'packages/vuikit/src/*/*/index.js',
    '!packages/vuikit/src/*/datepicker/index.js'
  ], 'build')

  // compile ES index
  await compileCollective({
    input: 'packages/vuikit/src/vuikit.esm.js',
    output: {
      format: 'es'
    }
  }, 'build/index.mjs')

  // compile CJS index
  await compileCollective({
    input: 'packages/vuikit/src/vuikit.cjs.js',
    output: {
      format: 'cjs'
    }
  }, 'build/index.js')

  // compile dist as UMD
  await compileCollective({
    input: 'packages/vuikit/src/vuikit.cjs.js',
    output: {
      name: 'Vuikit',
      format: 'umd'
    },
    external: []
  }, 'build/dist/vuikit.js')

  await minify('build/dist/vuikit.js', true)

  // compile theme
  await compileLess({
    src: 'packages/vuikit/src/theme/index.less',
    dest: 'build/dist/vuikit.css'
  })

  // compile theme minimized
  await compileLess({
    src: 'packages/vuikit/src/theme/index.less',
    dest: 'build/dist/vuikit.min.css',
    options: {
      minify: true,
      sourceMap: true
    }
  })

  // add banner to all js and css files
  await bannerize('build/**/*.{js,css}', require('./banner').default)
})()
