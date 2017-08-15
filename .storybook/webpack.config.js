const alias = require('../build/alias')

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.resolve = {
    ...storybookBaseConfig.resolve,
    extensions: ['.js', '.json', '.vue'],
    mainFiles: ['index', 'index.vue'],
    alias
  }

  storybookBaseConfig.module.rules.push({
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1
        }
      }
    ]
  })

  return storybookBaseConfig
}
