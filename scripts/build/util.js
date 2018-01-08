#!/usr/bin/env node
'use strict'

import path from 'path'
import globby from 'globby'

import argv from '@lump/argv'
import less from '@lump/less'
import write from '@lump/write'
import rollup from '@lump/rollup'

import rollupConfig from './rollup.config'

const args = argv()

export async function compileSingle (paths, dest) {
  const resources = globby.sync(paths)

  await Promise.all(resources.map(compile))

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
        external: id => id.match(/@?vuikit\/core/)
      }
    }, {
      report: args.report
    })

    await write(`${dest}/${basename}.js`, code, { log: true })
  }
}

export async function compileCollective (config, dest) {
  config = {
    ...rollupConfig,
    ...config
  }

  const { code } = await rollup(config, {
    report: args.report
  })

  await write(`${dest}`, code, { log: true })
}

export async function compileLess ({ src, dest, options }) {
  await less({
    src,
    dest,
    options: {
      log: true,
      relativeUrls: true,
      paths: [
        path.resolve(__dirname, '../../packages/vuikit/src/theme'),
        path.resolve(__dirname, '../../node_modules')
      ],
      ...options
    }
  })
}
