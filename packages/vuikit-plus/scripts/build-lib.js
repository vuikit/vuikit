#!/usr/bin/env node
'use strict'

import path from 'path'
import rollupConfig from '../rollup.config'

import globby from 'globby'
import argv from '@lump/argv'
import write from '@lump/write'
import remove from '@lump/remove'
import rollup from '@lump/rollup'

const args = argv()

;(async () => {
  await remove('lib')

  const components = await globby.sync('src/components/*/index.js')
  await Promise.all(components.map(compile))
})()

async function compile (input) {
  const dirname = path.dirname(input)
  const basename = path.basename(dirname)

  let { code } = await rollup({
    ...rollupConfig,
    ...{
      input,
      output: {
        format: 'es'
      }
    }
  }, {
    report: args.report
  })

  await write(`lib/${basename}.js`, code, { log: true })
}
