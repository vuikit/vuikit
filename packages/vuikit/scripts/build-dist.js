#!/usr/bin/env node
'use strict'

import pkg from '../package.json'
import rollupConfig from '../rollup.config'

import argv from '@lump/argv'
import write from '@lump/write'
import rollup from '@lump/rollup'
import remove from '@lump/remove'
import bannerit from '@lump/banner'

const args = argv()

const banner = `/**
 * Vuikit ${pkg.version}
 * (c) 2017 Miljan Aleksic
 * @license ${pkg.license}
 */`

;(async () => {
  await remove('dist')

  // ES
  await build({
    input: 'src/vuikit.esm.js',
    output: {
      format: 'es'
    }
  }, 'dist/vuikit.esm.js')

  // CJS
  await build({
    input: 'src/vuikit.cjs.js',
    output: {
      format: 'cjs'
    }
  }, 'dist/vuikit.cjs.js')

  // UMD
  await build({
    input: 'src/vuikit.cjs.js',
    globals: {
      vue: 'Vue'
    },
    output: {
      name: 'Vuikit',
      format: 'umd'
    },
    external: []
  }, 'dist/vuikit.js')

  // add banner to all dist files
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
