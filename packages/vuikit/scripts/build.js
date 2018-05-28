import rollup from 'rollup'
import path from 'path'
import globby from 'globby'
import buble from 'rollup-plugin-buble'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import nodeResolve from 'rollup-plugin-node-resolve'
import replaceInFile from 'replace-in-file'

import { run, remove, write, minifyJS } from '@miljan/build'

run(async () => {
  await BuildCore()
  await BuildLibrary()
  await BuildDist()
})

async function BuildCore () {
  let resources

  await remove('core')

  // COMPONENTS / DIRECTIVES
  resources = await globby('src/_core/{components,directives}/*/index.js')
  await Promise.all(resources.map(async input => {
    const dirname = path.dirname(input).replace('src/', '')
    const [, folder, name] = dirname.split('/')

    return compile(input, `core/${folder}/${name}.js`, {
      output: {
        format: 'es'
      },
      external: id => /vuikit\/src\/_core\/utils/.test(id)
    })
  }))

  // ASSETS / MIXINS
  resources = await globby('src/_core/{assets,mixins}/*.js')
  await Promise.all(resources.map(async input => {
    const name = path.basename(input, '.js')
    const folder = path.dirname(input).replace('src/_core/', '')

    return compile(input, `core/${folder}/${name}.js`, {
      output: {
        format: 'es'
      },
      external: id => /vuikit\/src\/_core\/utils/.test(id)
    })
  }))

  // UTILS
  resources = await globby('src/_core/utils/*.js')
  await Promise.all(resources.map(async input => {
    const basename = path.basename(input)
    return compile(input, `core/utils/${basename}`, {
      output: {
        format: 'es'
      },
      external (id) {
        const isRelative = /\.\//
        const isDateFns = /date-fns/

        if (id === input || isDateFns.test(id)) {
          return false
        }

        // consider all relative as external
        return !isRelative.test(id)
      }
    })
  }))

  await replaceInFile({
    files: 'core/**/*.js',
    from: /vuikit\/src\/_core/g,
    to: 'vuikit/core'
  })
}

async function BuildLibrary () {
  let resources = await globby('src/*/index.js')

  await remove('*.js')

  await Promise.all(resources.map(async input => {
    const basename = path.dirname(input).split('/').pop()
    return compile(input, `${basename}.js`, {
      output: {
        format: 'es'
      },
      external: id => {
        const isRelative = /\.\//
        const isDateFns = /date-fns/

        if (id === input || isRelative.test(id) || isDateFns.test(id)) {
          return false
        }

        const dirname = path.dirname(input)
        const isInternal = RegExp(`${dirname}/`)

        return !isInternal.test(id) // eslint-disable-line
      }
    })
  }))

  await replaceInFile({
    files: '*.js',
    from: /vuikit\/src/g,
    to: 'vuikit'
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
      nodeResolve({
        jsnext: true,
        main: true
      }),
      commonjs(),
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
