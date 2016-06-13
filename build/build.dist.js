// https://github.com/shelljs/shelljs
require('shelljs/global')

var ora = require('ora')
var webpack = require('webpack')
var utils = require('./utils')
var webpackConfig = require('./webpack.dist')
var each = require('lodash/each')

var spinner = ora()
spinner.text = 'building dist...'
spinner.start()

utils.cleanPath('dist')

each(webpackConfig, function (config) {
  webpack(config, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  })
})
