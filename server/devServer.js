'use strict'

const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

// use require('../webpack.prod.config.js') if you want to generate css files
const webpackConfig = require('../webpack.config.js')

const compiler = webpack(webpackConfig)
const port = 3000
const server = express()

server.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/assets/',
  stats: {
    colors: true
  },
  historyApiFallback: true
}))

server.use(webpackHotMiddleware(compiler))

server.use('/', express.static(path.join(__dirname, '..', 'client')))

server.listen(port, function () {
  console.log('Example server listening at http://localhost:%s', port)
})
