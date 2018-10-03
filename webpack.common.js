// Webpack v4
require('dotenv').config();

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  // Output app js
  output: {
    path: path.resolve(__dirname, process.env.ASSETS_OUTPUT_FOLDER),
    // To take the name of the index.js change for [name].[chunkhash].js
    filename: 'js/bundle.[chunkhash].js'
  },
  module: {
    rules: [
      {
        // Babel
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // If less than 10 kb, add base64 encoded image to css if not reference to file in  assets/img/
              limit: 10,
              // If more than 10 kb move to this folder in build using file-loader
              name: '[name].[ext]',
              // Relative path replaced in css references
              outputPath: './img/',
              // Create a folder img in assets folder for files that exceed the limit param
              publicPath: '../img/'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // If less than 10 kb, add base64 encoded image to css if not reference to file in  assets/img/
              limit: 10,
              // If more than 10 kb move to this folder in build using file-loader
              name: '[name].[ext]',
              // Relative path replaced in css references
              outputPath: './fonts/',
              // Create a folder fonts in assets folder for files that exceed the limit param
              publicPath: '../fonts/'
            }
          }
        ]
      }
    ]
  }
};
