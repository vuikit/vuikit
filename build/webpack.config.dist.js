const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const version = require('../package.json').version
const banner = `/*!
 * VuikitDocs v${version}
 * (c) 2016-present Miljan Aleksic
 * Released under the MIT License.
 */`

const commonConfig = () => webpackMerge(baseWebpackConfig, {
  entry: {
    'vuikit': './src'
  },
  externals: {
    vue: 'vue'
  },
  plugins: [
    // lodash optimizations
    new LodashModuleReplacementPlugin({
      'collections': true
    }),
    // add banner on top of each file
    new webpack.BannerPlugin({
      banner,
      raw: true,
      entryOnly: true
    }),
    // display better errors
    new FriendlyErrors()
  ]
})

module.exports = [
  webpackMerge(commonConfig(), {
    output: {
      path: 'dist',
      filename: '[name].min.js',
      chunkFilename: '[id].js'
    },
    devtool: '#source-map',
    plugins: [
      // http://vuejs.github.io/vue-loader/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': '"production"'
      }),
      // minify with dead-code elimination
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        minimize: true // for compatibilith with older loaders
      })
    ]
  }),
  // dist common
  webpackMerge(commonConfig(), {
    output: {
      path: 'dist',
      filename: '[name].common.js',
      chunkFilename: '[id].common.js',
      library: 'Vuikit',
      libraryTarget: 'commonjs2'
    },
    devtool: false
  })
]
