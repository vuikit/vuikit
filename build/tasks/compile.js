const path = require('path')
const alias = require('../alias')

const vue = require('rollup-plugin-vue')
const babel = require('rollup-plugin-babel')
const rollupAlias = require('rollup-plugin-alias')
const nodeResolve = require('rollup-plugin-node-resolve')

const task = require('@lump/task')
const size = require('@lump/size')
const rollitup = require('@lump/rollup')

const config = {
  plugins: [
    nodeResolve({
      extensions: [ '.js', '.json', '.vue' ]
    }),
    vue({
      compileTemplate: true
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    rollupAlias(alias)
  ]
}

module.exports = async () => {

  // common
  await task('Compile CJS', () => rollitup(
    extendConfig({
      entry: resolve('build/vuikit.common.js'),
      dest: resolve('dist/vuikit.common.js'),
      format: 'cjs',
      external: [
        'vue',
        '@vuikit/util'
      ]
    }), {
      env: 'production'
    })
  )

  await logSize(resolve('dist/vuikit.common.js'))

  // ES
  await task('Compile ES', () => rollitup(
    extendConfig({
      entry: resolve('build/vuikit.js'),
      dest: resolve('dist/vuikit.esm.js'),
      format: 'es',
      external: [
        'vue',
        '@vuikit/util',
        '@vuikit/icons'
      ]
    }), {
      env: 'development'
    })
  )

  await logSize(resolve('dist/vuikit.esm.js'))

  // UMD
  await task('Compile UMD', () => rollitup(
    extendConfig({
      entry: resolve('build/vuikit.common.js'),
      dest: resolve('dist/vuikit.js'),
      format: 'umd',
      moduleName: 'Vuikit',
      globals: {
        vue: 'Vue'
      },
      external: [
        'vue'
      ]
    }), {
      env: 'development'
    })
  )

  await logSize(resolve('dist/vuikit.js'))
}

async function logSize (file) {
  const _size = await size(file)
  console.log(` - ${_size}`)
}

function extendConfig (obj) {
  return Object.assign({}, config, obj)
}

function resolve (dir) {
  return path.join(__dirname, '../../', dir)
}
