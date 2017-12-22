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
      },
      external: id => id.match(/@vuikit\/core/)
    }
  }, {
    report: args.report
  })

  // fix the @vuikit/core path which is altered by alias
  code = code.replace(/from '(.*)node_modules\//g, `from '`)

  // write the component into lib
  await write(`lib/${basename}.js`, code, { log: true })
}
