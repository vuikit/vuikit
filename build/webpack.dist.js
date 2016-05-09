var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  entry: {
    'vuikit': './src/dist.js'
  },
  output: {
    path: 'dist',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js'
  },
  externals: {
    vue: 'Vue'
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: true, extract: true })
  },
  devtool: '#source-map',
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: true,
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
    new ExtractTextPlugin('[name].css'),
    new webpack.BannerPlugin(config.banner, {
      raw: true,
      entryOnly: true
    })
  ]
})
