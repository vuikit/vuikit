// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var utils = require('./utils')
var each = require('lodash/each')

// docs
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
utils.cleanPath(config.build.assetsRoot)
cp('-R', 'static/', assetsPath)
utils.webpackBuild(require('./webpack.docs.conf'))

// dist
utils.cleanPath(config.build.distRoot)
each(require('./webpack.dist.conf'), function (config) {
  utils.webpackBuild(config)
})
