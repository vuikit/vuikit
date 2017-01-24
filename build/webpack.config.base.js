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
    modules: [
      path.resolve(__dirname, '../node_modules')
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'lib': path.resolve(__dirname, '../lib'),
      'helpers': path.resolve(__dirname, '../helpers')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'eslint-loader',
        enforce: 'pre',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        use: 'eslint-loader',
        enforce: 'pre',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
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
