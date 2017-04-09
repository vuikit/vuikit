const path = require('path')
const alias = require('./alias')
const projectRoot = path.resolve(__dirname, '../')

module.exports = {
  resolve: {
    alias,
    modules: [
      path.resolve(__dirname, '../node_modules')
    ],
    extensions: ['.js', '.vue', '.json']
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
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  }
}
