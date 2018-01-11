import copy from '@lump/copy'
import write from '@lump/write'
import rollup from '@lump/rollup'
import minify from '@lump/minify'
import remove from '@lump/remove'
import bannerize from '@lump/banner'
import copyRecursive from '@lump/copy-recursive'

import pkg from '../package.json'
import rollupConfig from '../rollup.config'

const banner = `/**
 * Vuikit Icons ${pkg.version}
 * (c) 2018 Miljan Aleksic
 * @license ${pkg.license}
 */`

;(async () => {
  await remove('build/vuikit-icons')

  await Promise.all([
    copy('packages/vuikit-icons/*.{md,json}', 'build/vuikit-icons'),
    copyRecursive('packages/vuikit-icons/lib', 'build/vuikit-icons', [
      '!**/_import.js'
    ])
  ])

  // compile ESM dist
  await compile({
    input: 'packages/vuikit-icons/dist.esm.js',
    output: {
      format: 'es'
    }
  }, 'build/vuikit-icons/dist/vuikit-icons.esm.js')

  // compile CJS dist
  await compile({
    input: 'packages/vuikit-icons/dist.cjs.js',
    output: {
      format: 'cjs'
    }
  }, 'build/vuikit-icons/dist/vuikit-icons.cjs.js')

  // compile UMD dist
  await compile({
    input: 'packages/vuikit-icons/dist.cjs.js',
    output: {
      name: 'VuikitIcons',
      format: 'umd'
    }
  }, 'build/vuikit-icons/dist/vuikit-icons.js')

  await minify('build/vuikit-icons/dist/vuikit-icons.js', {
    sourceMap: true,
    log: true
  })

  await bannerize('build/vuikit-icons/**/*.js', banner)
})()

async function compile (config, dest) {
  config = {
    ...rollupConfig,
    ...config
  }

  const { code } = await rollup(config)

  await write(`${dest}`, code, { log: true })
}
