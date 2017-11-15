import path from 'path'
import globby from 'globby'
import alias from './alias'

import lumpit from '@lump/it'
import argv from '@lump/argv'
import write from '@lump/write'
import rollup from '@lump/rollup'

import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import rollupAlias from 'rollup-plugin-alias'
import nodeResolve from 'rollup-plugin-node-resolve'

const args = argv()

lumpit(async () => {
  const components = await globby.sync('src/components/*/index.js', {
    ignore: 'src/components/datepicker/index.js'
  })
  await Promise.all(components.map(compile))

  const directives = await globby.sync('src/directives/*/index.js')
  await Promise.all(directives.map(compile))
})

async function compile (input) {
  const dirname = path.dirname(input)
  const basename = dirname.split('/').pop()

  let { code } = await rollup({
    input,
    output: {
      format: 'es'
    },
    external: id => id.match(/@vuikit\/core/) || id === 'vue',
    plugins: [
      nodeResolve({
        extensions: [ '.js', '.json', '.vue' ]
      }),
      vue({
        compileTemplate: true
      }),
      buble(),
      rollupAlias(alias),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  }, {
    report: args.report
  })

  // fix the @vuikit/core path which is altered by alias
  code = code.replace(/from '(.*)node_modules\//g, `from '`)

  await write(`lib/${basename}.js`, code, { log: true })
}
