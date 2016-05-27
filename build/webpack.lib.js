var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base')

module.exports = merge(baseWebpackConfig, {
  entry: {
    Breadcrumb: ['./src/vue/Breadcrumb'],
    Crumb: ['./src/vue/BreadcrumbItem'],
    Button: ['./src/vue/Button'],
    ButtonLink: ['./src/vue/ButtonLink'],
    ButtonCheckbox: ['./src/vue/ButtonCheckbox'],
    ButtonRadio: ['./src/vue/ButtonRadio'],
    Calendar: ['./src/vue/Calendar'],
    Datepicker: ['./src/vue/Datepicker'],
    Modal: ['./src/vue/ModalDefault'],
    ModalLightbox: ['./src/vue/ModalLightbox'],
    ModalBlank: ['./src/vue/ModalBlank'],
    ModalAlert: ['./src/vue/ModalAlert'],
    ModalConfirm: ['./src/vue/ModalConfirm'],
    Pagination: ['./src/vue/Pagination'],
    Subnav: ['./src/vue/Subnav'],
    SubnavItem: ['./src/vue/SubnavItem'],
    Switcher: ['./src/vue/Switcher'],
    Switch: ['./src/vue/SwitcherItem'],
    Tab: ['./src/vue/Tab'],
    Tabs: ['./src/vue/TabsDefault'],
    TabsVertical: ['./src/vue/TabsVertical']
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
