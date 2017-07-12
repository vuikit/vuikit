const fs = require('fs')
const path = require('path')
const rmrf = require('rmrf')
const mkdirp = require('mkdirp')
const vue = require('rollup-plugin-vue')
const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const rollupAlias = require('rollup-plugin-alias')
const nodeResolve = require('rollup-plugin-node-resolve')
const localResolve = require('rollup-plugin-local-resolve')
const alias = require('../alias')
const util = require('../util')
const banner = require('../config.base').banner

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

const config = {
  moduleName: 'Vuikit',
  env: 'production',
  banner: banner,
  plugins: [
    localResolve(),
    rollupAlias(Object.assign({
      resolve: ['.jsx', '.js', 'index.js']
    }, alias)),
    vue({
      compileTemplate: true
    }),
    buble({
      objectAssign: 'Object.assign',
      jsx: 'h'
    }),
    nodeResolve({
      extensions: [ '.js', '.json', '.vue' ],
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ]
}

const builds = [
  // ES
  {
    entry: path.resolve(__dirname, './dist-esm.js'),
    dest: path.resolve(__dirname, '../../dist/vuikit.esm.js'),
    format: 'es',
    env: 'development'
  },
  // CommonJS
  {
    entry: path.resolve(__dirname, './dist.js'),
    dest: path.resolve(__dirname, '../../dist/vuikit.common.js'),
    format: 'cjs',
    env: 'development'
  },
  // Browser
  {
    entry: path.resolve(__dirname, './dist.js'),
    dest: path.resolve(__dirname, '../../dist/vuikit.js'),
    format: 'umd',
    env: 'development'
  },
  // production build (Browser)
  {
    entry: path.resolve(__dirname, './dist.js'),
    dest: path.resolve(__dirname, '../../dist/vuikit.min.js'),
    format: 'umd',
    sourceMap: true
  }
]

util.rollupBuild(config, builds)

/*
 * Compile Theme
 */

const compile = async (file, dist) => {
  try {
    let data = await util.read(file)

    // render less
    data = await util.renderLess(data, {
      relativeUrls: true,
      rootpath: '../../',
      paths: ['src/less/']
    })

    // write to file
    util.minify(await util.write(dist, data))
  } catch (err) {
    console.log(err)
  }
}

compile('src/less/theme.less', 'dist/vuikit.css')
