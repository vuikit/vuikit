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
  const es = await rollup({
    ...rollupConfig,
    ...{
      input: 'src/vuikit-plus.esm.js',
      output: {
        format: 'es'
      }
    }
  }, {
    report: args.report
  })

  await write('dist/vuikit-plus.esm.js', es.code, { log: true })

  // CJS
  const cjs = await rollup({
    ...rollupConfig,
    ...{
      input: 'src/vuikit-plus.cjs.js',
      output: {
        format: 'cjs'
      }
    }
  }, {
    report: args.report
  })

  await write('dist/vuikit-plus.cjs.js', cjs.code, { log: true })

  await bannerit('dist/*.js', banner)
})()
