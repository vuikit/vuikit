import lumpit from '@lump/it'
import argv from '@lump/argv'
import write from '@lump/write'
import rollup from '@lump/rollup'
import rollupConfig from './rollup.config.js'
import replace from 'rollup-plugin-replace'

lumpit(async () => {
  const args = argv()

  const config = {
    ...rollupConfig,
    input: 'build/dist.common.js',
    globals: {
      vue: 'Vue'
    },
    output: {
      name: 'Vuikit',
      format: 'umd'
    }
  }

  config.plugins.push(
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  )

  const { code } = await rollup(config, {
    report: args.report
  })

  await write('dist/vuikit.js', code, { log: true })
})
