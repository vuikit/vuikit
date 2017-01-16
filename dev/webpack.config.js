const path = require('path')
const config = require('../config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('../build/webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  entry: {
    main: path.resolve(__dirname, './main.js')
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './server/index.tmpl.ejs'),
      env: config.dev.env.NODE_ENV,
      inject: true
    })
  ]
})

// add hot-reload related code to entry chunks
Object.keys(module.exports.entry).forEach(function (name) {
  module.exports.entry[name] = ['./dev/server/client'].concat(module.exports.entry[name])
})
