import path from 'path'
import globby from 'globby'
import rollup from './util/rollup'
import { remove, run, task, write, copy, copyRecursive, banner as bannerize, minifyJS } from '@miljan/build'

import pkg from '../package.json'
import rollupConfig from '../rollup.config'

const banner = `/**
 * Vuikit Icons ${pkg.version}
 * (c) 2018 Miljan Aleksic
 * @license ${pkg.license}
 */`

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
      dest: 'dist/vuikit-icons.mins.js',
      options: {
        sourceMap: true
      }
    })
  })

  await bannerize('dist/**/*.js', banner)
})

async function compile (config, dest) {
  config = {
    ...rollupConfig,
    ...config
  }

  const { code } = await rollup(config)

  await write(`${dest}`, code, { log: true })
}
