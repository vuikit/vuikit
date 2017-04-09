const vue = require('rollup-plugin-vue')
const buble = require('rollup-plugin-buble')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const rollupAlias = require('rollup-plugin-alias')
const nodeResolve = require('rollup-plugin-node-resolve')
const config = require('./config')
const alias = require('../alias')

function getRollupConfig (opts) {
  const rollupConfig = {
    moduleName: 'Vuikit',
    banner: config.banner,
    sourceMap: opts.sourceMap,
    entry: opts.entry,
    dest: opts.dest,
    external: opts.external,
    format: opts.format,
    plugins: [
      rollupAlias(Object.assign({
        resolve: ['.jsx', '.js']
      }, alias, opts.alias)),
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
    rollupConfig.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  return rollupConfig
}

if (process.env.TARGET) {
  module.exports = getRollupConfig(config.builds[process.env.TARGET])
} else {
  exports.getBuild = name => getRollupConfig(config.builds[name])
  exports.getAllBuilds = () => Object.keys(config.builds).map(name => getRollupConfig(config.builds[name]))
}
