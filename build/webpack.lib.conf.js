var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')

delete baseWebpackConfig.entry
delete baseWebpackConfig.output

module.exports = merge(baseWebpackConfig, {
  entry: {
    Modal: './src/components/Modal.vue',
    Pagination: './src/components/Pagination.vue'
  },
  output: {
    path: config.lib.assetsRoot,
    filename: '[name].js'
  },
  externals: {
    vue: 'Vue'
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.lib.productionSourceMap, extract: true })
  },
  devtool: config.lib.productionSourceMap ? '#source-map' : false,
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
