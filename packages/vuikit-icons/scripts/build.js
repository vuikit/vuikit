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

  await task('Copy Files', () => Promise.all([
    copy('*.{md,json}', 'dist'),
    copyRecursive('lib', 'dist', [
      '!**/_import.js'
    ])
  ]))

  // compile ESM dist
  await task('Compile', async () => {

    await compile({
      input: 'build/dist.esm.js',
      output: {
        format: 'es'
      }
    }, 'dist/dist/vuikit-icons.esm.js')

    // compile CJS dist
    await compile({
      input: 'build/dist.cjs.js',
      output: {
        format: 'cjs'
      }
    }, 'dist/dist/vuikit-icons.cjs.js')

    // compile UMD dist
    await compile({
      input: 'build/dist.cjs.js',
      output: {
        name: 'VuikitIcons',
        format: 'umd'
      }
    }, 'dist/dist/vuikit-icons.js')

    await minifyJS({
      src: 'dist/dist/vuikit-icons.js',
      dest: 'dist/dist/vuikit-icons.mins.js',
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
