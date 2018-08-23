import path from 'path'
import globby from 'globby'
import buble from 'rollup-plugin-buble'
import cjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'
import cleanup from 'rollup-plugin-cleanup'
import resolve from 'rollup-plugin-node-resolve'
import replaceInFile from 'replace-in-file'

import { run, remove, write, minifyJS } from '@miljan/build'

const rollup = require('rollup')

process.env.NODE_ENV = 'production'

run(async () => {
  await BuildLibrary()
  await BuildDist()
})

async function BuildLibrary () {
  let resources

  await remove('lib')

  // CORE
  resources = await globby('src/_core/{components,directives}/*/index.js')
  await Promise.all(resources.map(async input => {
    const dirname = path.dirname(input).replace('src/', '')
    const [, folder, name] = dirname.split('/')

    return compile(input, `lib/core/${folder}/${name}.js`, {
      output: {
        format: 'es'
      },
      external: id => /vuikit\/src\/_core\/utils/.test(id)
    })
  }))

  resources = await globby('src/_core/{assets,mixins,helpers}/*.{js,vue}')
  await Promise.all(resources.map(async input => {
    const name = path.basename(input).replace(/\.(vue|js)/, '')
    const folder = path.dirname(input).replace('src/_core/', '')

    return compile(input, `lib/core/${folder}/${name}.js`, {
      output: {
        format: 'es'
      },
      external: id => /^vuikit\/src\/_core\/utils/.test(id)
    })
  }))

  resources = await globby('src/_core/utils/*.js')
  await Promise.all(resources.map(async input => {
    const basename = path.basename(input)
    return compile(input, `lib/core/utils/${basename}`, {
      output: {
        format: 'es'
      },
      external (id) {
        const isRelative = /^\.\//.test(id) || /_core\/util/.test(id)
        return input !== id && isRelative
      }
    })
  }))

  // LIBRARY
  resources = await globby('src/*/index.js')
  await Promise.all(resources.map(async input => {
    const [, component] = path.dirname(input).split('/')

    await compile(input, `lib/${component}.js`, {
      output: {
        format: 'es'
      },
      external: id => /^vuikit\/src/.test(id)
    })
  }))

  await replaceInFile({
    files: 'lib/**/*.js',
    from: /vuikit\/src\/_core/g,
    to: 'vuikit/lib/core'
  })

  await replaceInFile({
    files: 'lib/**/*.js',
    from: /vuikit\/src/g,
    to: 'vuikit/lib'
  })
}

async function BuildDist () {
  await remove('dist')

  // compile ES bundle
  await compile('src/install.esm.js', 'dist/vuikit.esm.js', {
    output: {
      format: 'es'
    }
  })

  // compile CJS bundle
  await compile('src/install.cjs.js', 'dist/vuikit.cjs.js', {
    output: {
      format: 'cjs'
    }
  })

  // compile UMD bundle
  await compile('src/install.cjs.js', 'dist/vuikit.js', {
    output: {
      name: 'Vuikit',
      format: 'umd'
    }
  }, 'development')

  await compile('src/install.cjs.js', 'dist/vuikit.min.js', {
    output: {
      name: 'Vuikit',
      format: 'umd'
    }
  }, 'production')

  await minifyJS({
    src: 'dist/vuikit.min.js',
    options: {
      sourceMap: true,
      output: {
        ascii_only: true
      },
      compress: {
        pure_funcs: ['makeMap']
      }
    }
  })
}

async function compile (input, dest, opts = {}, env) {
  const config = {
    input,
    ...opts,
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true,
        extensions: [ '.js', '.vue' ]
      }),
      cjs(),
      vue({}),
      buble(),
      cleanup()
    ]
  }

  if (env) {
    config.plugins.push(replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  const bundle = await rollup.rollup(config)
  const { code } = await bundle.generate(config.output)

  await write(dest, code, { log: true })
}
