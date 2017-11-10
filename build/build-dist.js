import alias from './alias'
import pkg from '../package.json'
import merge from '@vuikit/core/utils/merge'

import lumpit from '@lump/it'
import argv from '@lump/argv'
import write from '@lump/write'
import rollup from '@lump/rollup'
import bannerit from '@lump/banner'

import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import rollupAlias from 'rollup-plugin-alias'
import nodeResolve from 'rollup-plugin-node-resolve'

const args = argv()

const rollupConfig = {
  external: [
    'vue'
  ],
  plugins: [
    nodeResolve({
      extensions: [ '.js', '.json', '.vue' ]
    }),
    vue({
      compileTemplate: true
    }),
    buble(),
    rollupAlias(alias)
  ]
}

const banner = `/**
 * Vuikit ${pkg.version}
 * (c) 2017 Miljan Aleksic
 * @license ${pkg.license}
 */`

lumpit(async () => {
  // ES
  await build({
    input: 'build/dist.esm.js',
    output: {
      format: 'es'
    }
  }, 'dist/vuikit.esm.js')

  // CJS
  await build({
    input: 'build/dist.common.js',
    output: {
      format: 'cjs'
    }
  }, 'dist/vuikit.common.js')

  // UMD
  await build({
    input: 'build/dist.common.js',
    globals: {
      vue: 'Vue'
    },
    output: {
      name: 'Vuikit',
      format: 'umd'
    }
  }, 'dist/vuikit.js')

  // add banner to all dist files
  await bannerit('dist/*.js', banner)
})

async function build (config, dest) {
  config = merge({}, rollupConfig, config)

  config.plugins.push(
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  )

  const { code } = await rollup(config, {
    report: args.report
  })

  await write(dest, code, { log: true })
}
