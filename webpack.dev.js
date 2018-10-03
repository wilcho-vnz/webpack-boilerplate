// Plugins
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devServer: {
    contentBase: './dist',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    host: '0.0.0.0',
    port: process.env.NODE_PORT,
    // This allow to make public the assets folder
    publicPath: '/assets/'
  },
  // Output app js
  output: {
    path: path.resolve(__dirname, process.env.ASSETS_OUTPUT_FOLDER),
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
});
