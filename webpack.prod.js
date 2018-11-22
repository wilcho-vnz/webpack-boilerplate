// Plugins
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// Hash css files
const WebpackMd5Hash = require('webpack-md5-hash');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // Output app js
  output: {
    path: path.resolve(__dirname, process.env.ASSETS_OUTPUT_FOLDER),
    // To take the name of the index.js change for [name].[chunkhash].js
    filename: 'js/bundle.[chunkhash].js',
  },

  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        // Set to true if you want JS source maps
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

  plugins: [
    new CleanWebpackPlugin('dist/assets', {}),
    // Load ExtractTextPlugin to be used on the rules and output app css
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css',
    }),
    new WebpackMd5Hash(),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/img/static',
        to: 'img', // The dist/assets folder is already configured in the output folder in webpack.common.js
      },
      {
        from: 'src/html/',
        to: './dist/',
      },
    ]),
  ],
});
