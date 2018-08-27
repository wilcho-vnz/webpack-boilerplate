// webpack v4
require('dotenv').config();

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: './src/index.js'
    },
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
            test: /\.css$/,
            use: [{
                loader: "style-loader"
                }, {
                    loader: MiniCssExtractPlugin.loader
                },{
                loader: "css-loader", options: {
                    sourceMap: true
                }
            }]
        },
        { 
            test: /\.(png|jpg|gif)(\?\S*)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    limit: 10, // if less than 10 kb, add base64 encoded image to css if not reference to file in  assets/img/
                    name: '[name].[ext]', // if more than 10 kb move to this folder in build using file-loader
                    outputPath: './img/', // relative path replaced in css references
                    publicPath: '../img/' // create a folder img in assets folder for files that exceed the limit param
                }
            }]
        },
        { 
            test: /\.(eot|ttf|woff|woff2|svg)(\?\S*)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    limit: 10, // if less than 10 kb, add base64 encoded image to css if not reference to file in  assets/img/
                    name: '[name].[ext]', // if more than 10 kb move to this folder in build using file-loader
                    outputPath: './fonts/', // relative path replaced in css references
                    publicPath: '../fonts/' // create a folder fonts in assets folder for files that exceed the limit param
                }
            }]
        }]
    },
    node: {
        fs: 'empty', // allow require js files
    },
    resolve: {
        alias: {
            // allow use bg img in sass files, example: background: url('')
            assets: path.resolve(__dirname, 'src/assets')
        }
    }
};