const path = require('path')
const alias = require('../alias')

module.exports = {
  entry: {
    app: path.resolve(__dirname, './app.js'),
    preview: path.resolve(__dirname, './preview.js')
  },
  hotEntry: ['preview'],
  dist: 'dist-play',
  port: 5000,
  templateCompiler: true,
  vendor: false,
  html: [{
    chunks: ['app'],
    filename: 'index.html'
  }, {
    chunks: ['preview'],
    filename: 'preview.html'
  }],
  webpack: {
    resolve: {
      alias,
      extensions: ['.js', '.json', '.vue'],
      mainFiles: ['index', 'index.vue']
    }
  }
}
