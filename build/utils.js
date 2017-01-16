var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var ora = require('ora')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

// delete all content from a folder
exports.cleanPath = function (path) {
  rm('-rf', path)
  mkdir('-p', path)
}

// runs a webpack build
exports.webpackBuild = function (config, msg) {
  var spinner = ora(msg || 'building for production...')
  spinner.start()
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
}
