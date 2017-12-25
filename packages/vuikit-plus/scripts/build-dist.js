#!/usr/bin/env node
'use strict'

import pkg from '../package.json'
import rollupConfig from '../rollup.config'

import argv from '@lump/argv'
import write from '@lump/write'
import remove from '@lump/remove'
import rollup from '@lump/rollup'
import bannerit from '@lump/banner'

const args = argv()

const banner = `/**
 * Vuikit Plus ${pkg.version}
 * (c) 2017 Miljan Aleksic
 * @license ${pkg.license}
 */`

;(async () => {
  await remove('dist')

  // ES
  await build({
    input: 'src/vuikit-plus.esm.js',
    output: {
      format: 'es'
    }
  }, 'dist/vuikit-plus.esm.js')

  // CJS
  await build({
    input: 'src/vuikit-plus.cjs.js',
    output: {
      format: 'cjs'
    }
  }, 'dist/vuikit-plus.cjs.js')

  // UMD
  await build({
    input: 'src/vuikit-plus.cjs.js',
    globals: {
      vue: 'Vue'
    },
    output: {
      name: 'VuikitPlus',
      format: 'umd'
    },
    external: []
  }, 'dist/vuikit-plus.js')

  // final steps
  await bannerit('dist/*.js', banner)
})()

async function build (config, dest) {
  config = {
    ...rollupConfig,
    ...config
  }

  const { code } = await rollup(config, {
    report: args.report
  })

  await write(dest, code, { log: true })
}
