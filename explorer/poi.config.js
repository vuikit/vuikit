const path = require('path')
const alias = require('../build/alias')

module.exports = {
  entry: {
    app: path.resolve(__dirname, './main.js')
  },
  webpack: {
    resolve: {
      alias
    }
  }
}
