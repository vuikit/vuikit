const path = require('path')
const utils = require('./utils')
const config = require('../config')
const projectRoot = path.resolve(__dirname, '../')
const env = process.env.NODE_ENV

module.exports = {
  output: {
    path: config.build.assetsRoot,
    publicPath: env === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'helpers': path.resolve(__dirname, '../helpers')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
