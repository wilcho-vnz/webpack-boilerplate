// plugins
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash"); // hash css files

const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
  // output app js
  output: {
    path: path.resolve(__dirname, process.env.ASSETS_OUTPUT_FOLDER),
    filename: "js/bundle.[chunkhash].js" // to take the name of the index.js change for [name].[chunkhash].js
  },

  optimization: {
    minimize: process.env.NODE_ENV === "production" ? true : false,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  plugins: [
    new CleanWebpackPlugin("dist/assets", {}),
    // Load ExtractTextPlugin to be used on the rules and output app css
    new MiniCssExtractPlugin({
      filename: "css/style.[contenthash].css"
    }),
    new WebpackMd5Hash()
  ]
});
