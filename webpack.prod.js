// webpack v4
require('dotenv').config();

const path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash'); // hash css files
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: { main: './src/index.js' },
    // output app js
    output: {
        path: path.resolve(__dirname, process.env.ASSETS_OUTPUT_FOLDER),
        filename: 'js/bundle.[chunkhash].js' // to take the name of the index.js change for [name].[chunkhash].js
    },
    module: {
        rules: [{
            // Babel
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
                }, {
                    loader: MiniCssExtractPlugin.loader
                },{
                loader: "css-loader", options: {
                    sourceMap: true
                }
                }, {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
        },
        { 
            test: /\.(jpg|png)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1000, // if less than 10 kb, add base64 encoded image to css if not reference to file in  assets/img/
                    name: '[name].[ext]', // if more than 10 kb move to this folder in build using file-loader
                    outputPath: 'img/', // destiny folder for the files that exceed the limit param, the roor folder will be the specified on the output
                    publicPath: '../img/' // url that will be replace the path for the files that exceed the limit param
                }
            }]
        }]
    },
    node: {
        fs: 'empty', // allow require js files
    },
    plugins: [
        new CleanWebpackPlugin('dist/assets', {} ),
        // Load ExtractTextPlugin to be used on the rules and output app css
        new MiniCssExtractPlugin({
            filename: 'css/style.[contenthash].css',
        }),
        new WebpackMd5Hash()
    ],
    resolve: {
        alias: {
            // allow use bg img in sass files, example: background: url('')
            assets: path.resolve(__dirname, 'src/assets')
        }
    }
};