const path = require('path')

module.exports = {
  '~': resolve('src'),
  '~utils': resolve('node_modules/@vuikit/core/utils'),
  '~helpers': resolve('node_modules/@vuikit/core/helpers'),
  '~directives': resolve('node_modules/@vuikit/core/directives')
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
