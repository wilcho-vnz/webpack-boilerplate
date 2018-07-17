// webpack v4
require('dotenv').config();

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = {
    devServer: {
        contentBase: './dist',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        host: '0.0.0.0',
        port: process.env.NODE_PORT,
        publicPath: '/assets/' // this allow to make public the assets folder
    },
    entry: { main: './src/index.js' },
    // output app js
    output: {
        path: path.resolve(__dirname, process.env.ASSETS_OUTPUT_FOLDER),
        filename: 'js/bundle.js'
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
            use: [ 
                'style-loader',
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        },
        { 
            test: /\.(jpg|png)$/,
            loader: [{
                loader: 'url-loader',
                options: {
                    emitFile: false
                }
            }]
        }]
    },
    node: {
        fs: 'empty', // allow require js files
    },
    plugins: [
        // Load ExtractTextPlugin to be used on the rules and output app css
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
        // Load Hot Module plugin to refresh the browser with any file change
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        alias: {
            // allow use bg img in sass files, example: background: url('')
            assets: path.resolve(__dirname, 'src/assets')
        }
    }
    
};