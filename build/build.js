// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
env.NODE_ENV = 'production'

const path = require('path')
const config = require('../config')
const utils = require('./utils')
const each = require('lodash/each')

// docs
const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
utils.cleanPath(config.build.assetsRoot)
cp('-R', 'static/', assetsPath)
utils.webpackBuild(require('./webpack.dist.conf'))

// dist
utils.cleanPath(config.build.distRoot)
each(require('./webpack.dist.conf'), function (wpconfig) {
  utils.webpackBuild(wpconfig)
})
