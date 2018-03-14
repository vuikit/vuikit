const rollup = require('rollup')
const rollupAnalyzer = require('rollup-analyzer')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

/*
 * Rollup bundler wrapper
 */
module.exports = async (_config, options) => {
  const plugins = [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs()
  ]

  const config = {..._config}
  const opts = {
    report: false,
    ...options
  }

  config.plugins = config.plugins
    ? config.plugins.concat(plugins) // config plugins should resolve first
    : plugins

  const bundle = await rollup.rollup(config)

  if (opts.report) {
    const analyze = rollupAnalyzer()

    try {
      // print console optimized analysis string
      await analyze.formatted(bundle).then(console.log)
    } catch (e) {
      console.error(e)
    }
  }

  return bundle.generate(config.output)
}
