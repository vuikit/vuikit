import path from 'path'
import rollup from './util/rollup'

import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import cleanup from 'rollup-plugin-cleanup'
import nodeResolve from 'rollup-plugin-node-resolve'

import { run, remove, write, task, banner, less, minifyJS, minifyCSS } from '@miljan/build'

import Copyright from './_copyright'

run(async () => {
  await remove('dist')

  await task('Compile JS', async () => {
    // compile ES index
    await compile({
      input: 'src/vuikit.esm.js',
      output: {
        format: 'es'
      },
      env: 'development'
    }, 'dist/vuikit.esm.js')

    // compile CJS index
    await compile({
      input: 'src/vuikit.cjs.js',
      output: {
        format: 'cjs'
      },
      env: 'development'
    }, 'dist/vuikit.cjs.js')

    // compile dist as UMD
    await compile({
      input: 'src/vuikit.cjs.js',
      output: {
        name: 'Vuikit',
        format: 'umd'
      },
      env: 'development'
    }, 'dist/vuikit.js')

    // compile dist as UMD for production
    await compile({
      input: 'src/vuikit.cjs.js',
      output: {
        name: 'Vuikit',
        format: 'umd'
      },
      env: 'production'
    }, 'dist/vuikit.min.js')

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
  })

  await task('Compile CSS', async () => {
    await less({
      src: 'src/theme/index.less',
      dest: 'dist/vuikit.css',
      options: {
        relativeUrls: true,
        paths: [
          path.resolve(__dirname, '../src/theme'),
          path.resolve(__dirname, '../../../node_modules')
        ]
      }
    })

    await minifyCSS({
      src: 'dist/vuikit.css',
      dest: 'dist/vuikit.min.css',
      options: {
        sourceMap: true
      }
    })
  })

  await banner('dist/*.{js,css}', Copyright)
})

async function compile (opts, dest) {
  const config = {
    input: opts.input,
    output: opts.output,
    format: opts.format,
    external: opts.external,
    plugins: [
      nodeResolve({
        extensions: [ '.js', '.json' ]
      }),
      buble(),
      cleanup()
    ]
  }

  if (opts.env) {
    config.plugins.push(replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  const { code } = await rollup(config)
  await write(`${dest}`, code, { log: true })
}
