'use strict'

const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const PATHS = {
  app: path.resolve('client', 'app'),
  appjs: path.resolve('client', 'app', 'index'),
  assets: path.resolve('client', 'assets'),
  client: path.resolve('client'),
  dist: path.resolve('dist')
}

let devtool = 'source-map'

let entry = {
  app: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    PATHS.appjs
  ]
}

let loaders = [
  {
    test: /\.js$/,
    loaders: ['babel'],
    exclude: /node_modules/
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceMap&sourceComments'),
    exclude: /node_modules/
  },
  {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!less?sourceMap'),
    exclude: /node_modules/
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css!postcss')
  },
  {
    test: /\.png$/,
    loader: 'url?limit=100000'
  },
  {
    test: /\.jpg$/,
    loader: 'file'
  },
  {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file'
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=image/svg+xml'
  }
]

let output = {
  filename: 'bundle.js',
  path: PATHS.assets,
  publicPath: '/assets/'
}

let plugins = [
  new ExtractTextPlugin('[name].css', {allChunks: true}),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]

let postcss = [ autoprefixer({ browsers: ['last 3 versions'] }) ]

let resolve = {
  extensions: ['', '.js'],
  root: [path.resolve(PATHS.app)] // allow es6 module import to use absolute paths to your project files, instead of relative paths
}

module.exports = {
  devtool,
  entry,
  module: { loaders },
  output,
  plugins,
  postcss,
  resolve
}
