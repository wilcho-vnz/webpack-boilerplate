// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// Hash css files
const WebpackMd5Hash = require('webpack-md5-hash')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  // mode: 'production',
  // Output app js
  output: {
    // To take the name of the index.js change for [name].[chunkhash].js
    filename: 'js/bundle.[chunkhash].js'
  },
  plugins: [
    // Load ExtractTextPlugin to be used on the rules and output app css
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css'
    }),
    new WebpackMd5Hash()
  ]
})
