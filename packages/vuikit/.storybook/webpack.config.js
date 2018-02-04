const path = require('path')

module.exports = baseConfig => {

  baseConfig.module.rules.push({
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          paths: [path.resolve(__dirname, '../../../node_modules')]
        }
      }
    ]
  })

  baseConfig.resolve.extensions.push('.vue')

  return baseConfig
}
