const fs = require('fs')
const path = require('path')
const vue = require('rollup-plugin-vue')
const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const rollupAlias = require('rollup-plugin-alias')
const nodeResolve = require('rollup-plugin-node-resolve')
const localResolve = require('rollup-plugin-local-resolve')
const alias = require('./alias')
const util = require('./util')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

const config = {
  moduleName: 'Vuikit',
  env: 'production',
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

const builds = getDirectories(
  path.resolve(__dirname, '../src/js/components/')
).map(component => {
  return {
    entry: path.resolve(__dirname, `../src/js/components/${component}/index.js`),
    dest: path.resolve(__dirname, `../dist/es/${component}.js`),
    format: 'es',
    env: 'development'
  }
})

util.rollupBuild(config, builds)

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
}
