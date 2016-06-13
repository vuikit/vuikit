// https://github.com/shelljs/shelljs
require('shelljs/global')

var ora = require('ora')
var utils = require('./utils')
var webpackConfig = require('./webpack.dist')
var each = require('lodash/each')

var spinner = ora()
spinner.text = 'building dist...'
spinner.start()

utils.cleanPath('dist')

each(webpackConfig, function (config) {
  utils.webpackBuild(config, spinner)
})
