/* eslint-env shelljs */
const fs = require('fs')
const webpack = require('webpack')
const path = require('path')
const ora = require('ora')
const less = require('less')
const CleanCSS = require('clean-css')
const mkdirp = require('mkdirp')

exports.read = function (file, callback) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }

      resolve(data)
      callback && callback(data)
    })
  })
}

exports.write = function (dest, data) {
  return new Promise((resolve, reject) =>
    mkdirp(path.dirname(dest), err => {
      if (err) {
        reject(err)
      }

      fs.writeFile(dest, data, err => {
        if (err) {
          return reject(err)
        }
        exports.logFile(dest)
        resolve(dest)
      })
    })
  )
}

exports.renderLess = function (data, options) {
  return less.render(data, options).then(output => output.css)
}

exports.minify = function (file) {
  return new CleanCSS({
    advanced: false,
    keepSpecialComments: 0,
    rebase: false,
    returnPromise: true
  }).minify([file]).then(minified => exports.write(`${path.join(path.dirname(file), path.basename(file, '.css'))}.min.css`, minified.styles))
}

exports.logFile = function (file) {
  exports.read(file).then(data => console.log(`${exports.cyan(file)} ${exports.getSize(data)}`))
}

exports.getSize = function (data) {
  return `${(data.length / 1024).toFixed(2)}kb`
}

exports.cyan = function (str) {
  return `\x1b[1m\x1b[36m${str}\x1b[39m\x1b[22m`
}

exports.blue = function (str) {
  return `\x1b[1m\x1b[34m${str}\x1b[39m\x1b[22m`
}

// delete all content from a folder
exports.cleanPath = function (path) {
  rm('-rf', path)
  mkdir('-p', path)
}

// runs a webpack build
exports.webpackBuild = function (config, msg) {
  const spinner = ora(msg || 'building for production...')
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
