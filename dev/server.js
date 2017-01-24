require('../build/check-versions')()
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../config')
const webpackConfig = require('./webpack.config')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

const hotMiddleware = webpackHotMiddleware(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve static content
app.use('/static', express.static(path.resolve(__dirname, './static')))

// serve pure static assets
app.use('/assets', express.static(path.resolve(__dirname, '../node_modules/uikit/dist')))
app.use('/assets/js', express.static(path.resolve(__dirname, '../node_modules/uikit/node_modules/jquery/dist')))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  const uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
})
