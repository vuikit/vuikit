const path = require('path')
const nodeResolve = require('rollup-plugin-node-resolve')
const vue = require('rollup-plugin-vue')
const buble = require('rollup-plugin-buble')
const rollupAlias = require('rollup-plugin-alias')

const lumpit = require('@lump/it')
const task = require('@lump/task')
const remove = require('@lump/remove')
const rollup = require('@lump/rollup')
const minify = require('@lump/minify')
const less = require('@lump/less')
const bannerit = require('@lump/banner')

const pkg = require('../package.json')
const alias = require('./alias.js')

const banner = `/*
* Vuikit ${pkg.version}
* (c) ${(new Date()).getFullYear()} Miljan Aleksic
* Released under the ${pkg.license} License.
*/`

const rollupSharedConfig = {
  plugins: [
    nodeResolve({
      extensions: [ '.js', '.json', '.vue' ]
    }),
    vue({
      compileTemplate: true
    }),
    buble({
      objectAssign: 'Object.assign',
      jsx: 'h'
    }),
    rollupAlias(alias)
  ]
}

const rollupCommonConfig = Object.assign({}, rollupSharedConfig, {
  entry: resolve('build/prod/dist.js'),
  dest: resolve('dist/vuikit.common.js'),
  format: 'cjs',
  external: [
    '@vuikit/util'
  ]
})

const rollupEsmConfig = Object.assign({}, rollupSharedConfig, {
  entry: resolve('build/prod/dist-esm.js'),
  dest: resolve('dist/vuikit.esm.js'),
  format: 'es',
  external: [
    '@vuikit/util'
  ]
})

const rollupUmdConfig = Object.assign({}, rollupSharedConfig, {
  entry: resolve('build/prod/dist.js'),
  dest: resolve('dist/vuikit.js'),
  format: 'umd',
  moduleName: 'Vuikit'
})

lumpit(async () => {
  await remove('dist')

  await task({
    text: 'Build Common',
    exec: () => rollup({
      config: rollupCommonConfig
    }, {
      env: 'development'
    })
  })

  await task({
    text: 'Build ES',
    exec: () => rollup({
      config: rollupEsmConfig
    }, {
      env: 'development'
    })
  })

  await task({
    text: 'Build UMD',
    exec: async () => {
      await rollup({
        config: rollupUmdConfig
      }, {
        env: 'production'
      })
      await minify({
        src: 'dist/vuikit.js',
        sourceMap: true
      })
      await rollup({
        config: rollupUmdConfig
      }, {
        env: 'development'
      })
    }
  })

  await task({
    text: 'Compile Theme',
    exec: async () => {
      await less({
        src: 'src/less/theme.less',
        dest: 'dist/vuikit.css',
        options: {
          relativeUrls: true,
          rootpath: '../../',
          paths: ['src/less/']
        }
      })

      await minify({
        src: 'dist/vuikit.css'
      })
    }
  })

  await bannerit({
    src: 'dist/*.{js,css}',
    banner
  })
})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
