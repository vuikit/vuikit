var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

delete baseWebpackConfig.entry
delete baseWebpackConfig.output

module.exports = merge(baseWebpackConfig, {
  entry: {
    vuikit: './src/dist.js'
  },
  output: {
    path: config.dist.assetsRoot,
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  externals: {
    vue: 'Vue'
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dist.productionSourceMap, extract: true })
  },
  devtool: config.dist.productionSourceMap ? '#source-map' : false,
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.dist.productionSourceMap,
      extract: true
    })
  },
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
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('[name].css')),
    new webpack.BannerPlugin(config.banner, {
      raw: true,
      entryOnly: true
    })
  ]
})
