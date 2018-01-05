const path = require('path')

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
      alias: {
        '@vuikit/vuikit$': '@vuikit/vuikit/src/index.js'
      },
      extensions: ['.js', '.json', '.vue'],
      mainFiles: ['index', 'index.vue']
    }
  },
  extendWebpack (config) {
    config.module
      .rule('less')
      .use('less-loader')
      .options({
        paths: [
          path.resolve(__dirname, '../node_modules')
        ]
      })
  }
}
