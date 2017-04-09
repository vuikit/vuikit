const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('../webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const config = require('./config')

module.exports = webpackMerge(baseWebpackConfig, {
  entry: {
    vuikit: path.resolve(__dirname, './app/main.js')
  },
  output: {
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath,
    filename: '[name].min.js',
    chunkFilename: '[name].min.js'
  },
  devtool: 'eval',
  plugins: [
    new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true
    }),
    new webpack.DefinePlugin({
      'process.env': "'development'"
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './index.html'),
      env: '"production"',
      inject: true
    })
  ]
})

// add hot-reload related code to entry chunks
Object.keys(module.exports.entry).forEach(function (name) {
  module.exports.entry[name] = ['./build/dev/client'].concat(module.exports.entry[name])
})
