// Plugins
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  // mode: 'development',
  devServer: {
    contentBase: `${process.env.WEBPACK_CONTENT_BASE}`,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    host: 'localhost',
    // Open browser
    open: true,
    port: process.env.NODE_PORT,
    // This allow to make public the assets folder
    publicPath: `${process.env.WEBPACK_PUBLIC_PATH}`
  },
  // Output app js
  output: {
    path: path.resolve(
      __dirname,
      `${process.env.PUBLIC_PATH}/${process.env.ASSETS_FOLDER}`
    ),
    filename: 'js/bundle.js'
  },
  plugins: [
    // Load ExtractTextPlugin to be used on the rules and output app css
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
    // Load Hot Module plugin to refresh the browser with any file change
    new webpack.HotModuleReplacementPlugin()
  ]
})
