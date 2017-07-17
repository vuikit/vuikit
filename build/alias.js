const path = require('path')

module.exports = {
  src: resolve('src'),
  lib: resolve('src/js'),
  helpers: resolve('helpers'),
  explorer: resolve('explorer'),
  icons: resolve('icons')
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
