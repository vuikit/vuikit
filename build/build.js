// https://github.com/shelljs/shelljs
require('shelljs/global')

env.NODE_ENV = 'production' // eslint-disable-line no-undef

var path = require('path')
var ora = require('ora')
var webpack = require('webpack')
var config = require('../config')
var utils = require('./utils')
var webpackProdConfig = require('./webpack.prod.conf')
var webpackDistConfig = require('./webpack.dist.conf')
var webpackLibConfig = require('./webpack.lib.conf')
var spinner = ora()

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

function processStats (stats) {
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
}

/* Build docs */
spinner.text = 'building for production...'
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
utils.cleanPath(assetsPath)
// cp('-R', 'static/', assetsPath) // eslint-disable-line no-undef

webpack(webpackProdConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  processStats(stats)

  /* Build dist */
  spinner.text = 'building dist...'
  spinner.start()

  utils.cleanPath(config.dist.assetsRoot)
  webpack(webpackDistConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    processStats(stats)

    /* Build lib */
    spinner.text = 'building lib...'
    spinner.start()

    utils.cleanPath(config.lib.assetsRoot)
    webpack(webpackLibConfig, function (err, stats) {
      spinner.stop()
      if (err) throw err
      processStats(stats)
    })
  })
})
