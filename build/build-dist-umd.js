import lumpit from '@lump/it'
import argv from '@lump/argv'
import write from '@lump/write'
import rollup from '@lump/rollup'
import rollupConfig from './rollup.config.js'

lumpit(async () => {
  const args = argv()

  const config = {
    ...rollupConfig,
    input: 'build/vuikit.common.js',
    globals: {
      vue: 'Vue'
    },
    output: {
      name: 'Vuikit',
      format: 'umd'
    }
  }

  const { code } = await rollup(config, {
    report: args.report
  })

  await write('dist/vuikit.js', code, { log: true })
})
