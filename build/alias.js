const path = require('path')

module.exports = {
  root: resolve(''),
  src: resolve('src'),
  lib: resolve('src/js'),
  helpers: resolve('helpers'),
  icons: resolve('icons')
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
