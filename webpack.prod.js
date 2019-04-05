// Plugins
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Hash css files
const WebpackMd5Hash = require('webpack-md5-hash');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // Output app js
  output: {
    path: path.resolve(__dirname, process.env.ASSETS_FOLDER),
    // To take the name of the index.js change for [name].[chunkhash].js
    filename: 'js/bundle.[chunkhash].js',
  },
  plugins: [
    new CleanWebpackPlugin(process.env.ASSETS_FOLDER, {}),
    // Load ExtractTextPlugin to be used on the rules and output app css
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css',
    }),
    new WebpackMd5Hash(),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/img',
        to: path.resolve(__dirname, `${process.env.ASSETS_FOLDER}/img/`),
        ignore: ['.gitignore'],
      },
    ]),
  ],
});
