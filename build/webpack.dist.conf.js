var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var baseWebpackConfig = merge(require('./webpack.base.conf'), {
  entry: {
    'vuikit': './src/lib/'
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('[name].css')),
    // add banner on top of each file
    new webpack.BannerPlugin(config.build.banner, {
      raw: true,
      entryOnly: true
    }),
    // workaround to exclude moment.js locales
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
})

module.exports = [
  // dist
  merge({}, baseWebpackConfig, {
    output: {
      path: 'dist',
      filename: '[name].js',
      chunkFilename: '[id].js'
    },
    externals: {
      vue: 'Vue' // uppercased as the global variable
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  }),
  // dist common
  merge({}, baseWebpackConfig, {
    output: {
      path: 'dist',
      filename: '[name].common.js',
      chunkFilename: '[id].common.js',
      library: 'Vuikit',
      libraryTarget: 'commonjs2'
    },
    externals: {
      vue: 'vue' // lowercased as the node folder
    },
    devtool: false,
  })
]
