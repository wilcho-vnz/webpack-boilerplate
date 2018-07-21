const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require('webpack-merge');
const path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash'); // hash css files

module.exports = merge(common, {
    // output app js
    output: {
        path: path.resolve(__dirname, process.env.ASSETS_OUTPUT_FOLDER),
        filename: 'js/bundle.[chunkhash].js' // to take the name of the index.js change for [name].[chunkhash].js
    },
    plugins: [
        new CleanWebpackPlugin('dist/assets', {} ),
        // Load ExtractTextPlugin to be used on the rules and output app css
        new MiniCssExtractPlugin({
            filename: 'css/style.[contenthash].css',
        }),
        new WebpackMd5Hash()
    ]
});
