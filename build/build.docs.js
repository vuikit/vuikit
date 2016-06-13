// https://github.com/shelljs/shelljs
require('shelljs/global')

var ora = require('ora')
var webpack = require('webpack')
var utils = require('./utils')
var webpackConfig = require('./webpack.docs')

var spinner = ora()
spinner.text = 'building docs...'
spinner.start()

/* eslint-disable no-undef */
utils.cleanPath('docs-dist')
cp('-R', 'static/', 'docs-dist')
cp('-R', 'node_modules/uikit/dist/fonts/', 'docs-dist/fonts')

webpack(webpackConfig, function (err, stats) {
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
