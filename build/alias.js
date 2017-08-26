const path = require('path')

module.exports = {
  src: resolve('src'),
  helpers: resolve('helpers')
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
