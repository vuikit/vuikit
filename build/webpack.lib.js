var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base')

module.exports = merge(baseWebpackConfig, {
  entry: {
    modal: './src/vue/Modal.vue',
    pagination: './src/vue/Pagination.vue'
  },
  output: {
    path: 'lib',
    filename: '[name].js'
  },
  externals: {
    vue: 'Vue'
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: true, extract: true })
  },
  devtool: '#source-map',
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.BannerPlugin(config.banner, {
      raw: true,
      entryOnly: true
    })
  ]
})
