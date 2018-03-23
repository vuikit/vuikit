import path from 'path'
import globby from 'globby'
import rollup from './util/rollup'
import { remove, run, task, write, minifyJS } from '@miljan/build'

import rollupConfig from '../rollup.config'

run(async () => {
  await remove('dist')
  await remove('lib')

  const icons = await globby('src/uikit/*')

  await Promise.all(icons.map(async icon => {
    const basename = path.basename(icon)
    // const basename = dirname.split('/').pop()

    return compile({
      input: icon,
      output: {
        format: 'cjs'
      }
    }, `lib/${basename}`)
  }))

  // compile CJS dist
  await compile({
    input: 'src/vuikit-icons.cjs.js',
    output: {
      format: 'cjs'
    }
  }, 'dist/vuikit-icons.cjs.js')

  // compile ESM dist
  await task('Compile', async () => {

    await compile({
      input: 'src/vuikit-icons.esm.js',
      output: {
        format: 'es'
      }
    }, 'dist/vuikit-icons.esm.js')

    // compile CJS dist
    await compile({
      input: 'src/vuikit-icons.cjs.js',
      output: {
        format: 'cjs'
      }
    }, 'dist/vuikit-icons.cjs.js')

    // compile UMD dist
    await compile({
      input: 'src/vuikit-icons.cjs.js',
      output: {
        name: 'VuikitIcons',
        format: 'umd'
      }
    }, 'dist/vuikit-icons.js')

    await minifyJS({
      src: 'dist/vuikit-icons.js',
      dest: 'dist/vuikit-icons.min.js',
      options: {
        sourceMap: true
      }
    })
  })
})

async function compile (config, dest) {
  config = {
    ...rollupConfig,
    ...config
  }

  const { code } = await rollup(config)

  await write(`${dest}`, code, { log: true })
}
