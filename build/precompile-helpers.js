const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const rollupAlias = require('rollup-plugin-alias')
const nodeResolve = require('rollup-plugin-node-resolve')
const path = require('path')
const alias = require('./alias')
const util = require('./util')

const config = {
  format: 'cjs',
  plugins: [
    rollupAlias(Object.assign({
      resolve: ['.jsx', '.js']
    }, alias)),
    nodeResolve({
      extensions: [ '.js' ]
    }),
    buble({
      objectAssign: 'Object.assign'
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ]
}

const builds = [{
  entry: path.resolve(__dirname, '../helpers/date-matrix.js'),
  dest: path.resolve(__dirname, '../dist/helpers/date-matrix.js')
}, {
  entry: path.resolve(__dirname, '../helpers/pagination-matrix.js'),
  dest: path.resolve(__dirname, '../dist/helpers/pagination-matrix.js')
}]

util.rollupBuild(config, builds)
