#!/usr/bin/env node
'use strict'

import path from 'path'
import globby from 'globby'
import buble from 'rollup-plugin-buble'

import argv from '@lump/argv'
import write from '@lump/write'
import rollup from '@lump/rollup'
import remove from '@lump/remove'

let dest
let assets
const args = argv()

;(async () => {
  await remove('directives')
  await remove('helpers')
  await remove('utils')

  // directives
  assets = await globby.sync('src/directives/*/*.js')
  await compile(assets, 'directives')

  // helpers
  assets = await globby.sync('src/helpers/*.js')
  await compile(assets, 'helpers')

  // utils
  assets = await globby.sync('src/utils/*.js')
  await compile(assets, 'utils')
})()

async function compile (assets, _dest) {
  dest = _dest
  await Promise.all(assets.map(_compile))
}

async function _compile (input) {
  let basename = path.basename(input)

  if (basename === 'index.js') {
    const dirname = path.dirname(input)
    basename = dirname.split('/').pop() + '.js'
  }

  let { code } = await rollup({
    input,
    output: {
      format: 'es'
    },
    // force all local imports as external
    external: id => id.match(/@vuikit\/core/),
    plugins: [
      buble()
    ]
  }, {
    report: args.report
  })

  await write(`${dest}/${basename}`, code, { log: true })
}
