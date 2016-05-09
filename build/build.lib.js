// https://github.com/shelljs/shelljs
require('shelljs/global')

var ora = require('ora')
var webpack = require('webpack')
var utils = require('./utils')
var webpackConfig = require('./webpack.lib')

var spinner = ora()
spinner.text = 'building lib...'
spinner.start()

utils.cleanPath('dist')
cp('-R', 'static/', 'dist') // eslint-disable-line no-undef

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
