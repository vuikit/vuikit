// https://github.com/shelljs/shelljs
require('shelljs/global')

var ora = require('ora')
var utils = require('./utils')
var webpackConfig = require('./webpack.docs')

var spinner = ora()
spinner.text = 'building docs...'
spinner.start()

/* eslint-disable no-undef */
utils.cleanPath('docs-dist')
cp('-R', 'static/', 'docs-dist')
cp('-R', 'node_modules/uikit/dist/fonts/', 'docs-dist/fonts')

utils.webpackBuild(webpackConfig, spinner)
