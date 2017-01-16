// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
// env.NODE_ENV = 'production'

// const path = require('path')
const utils = require('./utils')

// docs
// const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
// utils.cleanPath(config.build.assetsRoot)
// cp('-R', 'static/', assetsPath)
// utils.webpackBuild(require('./webpack.dist.conf'))

// dist
utils.cleanPath('dist')
utils.webpackBuild(require('./webpack.config.dist'))
