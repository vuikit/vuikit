#!/usr/bin/env node
'use strict'

import rollupConfig from '../rollup.config'

import path from 'path'
import globby from 'globby'

import argv from '@lump/argv'
import write from '@lump/write'
import rollup from '@lump/rollup'
import remove from '@lump/remove'

const args = argv()

;(async () => {
  await remove('lib')

  const components = await globby.sync('src/components/*/index.js', {
    ignore: 'src/components/datepicker/index.js'
  })
  await Promise.all(components.map(compile))

  const directives = await globby.sync('src/directives/*/index.js')
  await Promise.all(directives.map(compile))
})()

async function compile (input) {
  const dirname = path.dirname(input)
  const basename = dirname.split('/').pop()

  let { code } = await rollup({
    ...rollupConfig,
    ...{
      input,
      output: {
        format: 'es'
      },
      external: id => id.match(/@vuikit\/core/) || id === 'vue'
    }
  }, {
    report: args.report
  })

  await write(`lib/${basename}.js`, code, { log: true })
}
