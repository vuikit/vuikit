const path = require('path')

module.exports = {
  '~': resolve('src')
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
