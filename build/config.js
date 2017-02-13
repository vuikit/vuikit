const path = require('path')
const vue = require('rollup-plugin-vue')
const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const alias = require('rollup-plugin-alias')
const nodeResolve = require('rollup-plugin-node-resolve')
const version = process.env.VERSION || require('../package.json').version

const banner =
  '/*!\n' +
  ' * Vuikit v' + version + '\n' +
  ' * (c) 2016-present Miljan Aleksic\n' +
  ' * Released under the MIT License.\n' +
  ' */'

const builds = {
  // ES
  'es': {
    entry: path.resolve(__dirname, '../lib/es.js'),
    dest: path.resolve(__dirname, '../dist/vuikit.mjs'),
    format: 'es'
  },
  // CommonJS
  'cjs': {
    entry: path.resolve(__dirname, '../lib/index.js'),
    dest: path.resolve(__dirname, '../dist/vuikit.common.js'),
    format: 'cjs'
  },
  // Browser
  'umd': {
    entry: path.resolve(__dirname, '../lib/index.js'),
    dest: path.resolve(__dirname, '../dist/vuikit.js'),
    format: 'umd',
    env: 'development'
  },
  // production build (Browser)
  'umd-production': {
    entry: path.resolve(__dirname, '../lib/index.js'),
    dest: path.resolve(__dirname, '../dist/vuikit.min.js'),
    format: 'umd',
    env: 'production',
    sourceMap: true
  }
}

function genConfig (opts) {
  const config = {
    moduleName: 'Vuikit',
    banner,
    sourceMap: opts.sourceMap,
    entry: opts.entry,
    dest: opts.dest,
    external: opts.external,
    format: opts.format,
    plugins: [
      alias(Object.assign({
        resolve: ['.jsx', '.js']
      }, require('./alias'), opts.alias)),
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
      nodeResolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs()
    ]
  }

  if (opts.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET])
} else {
  exports.getBuild = name => genConfig(builds[name])
  exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]))
}
