// Webpack v4
require('dotenv').config();

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './index.js',
  },
  // Output app js
  output: {
    path: path.resolve(__dirname, process.env.ASSETS_FOLDER),
    // To take the name of the index.js change for [name].[chunkhash].js
    filename: 'js/bundle.[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: true,
          configFile: './.eslintrc.json',
        },
      },
      {
        // Babel
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          { loader: 'pug-html-loader', options: { pretty: true } },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
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
              publicPath: '../img/',
            },
          },
        ],
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
              publicPath: '../fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      excludeAssets: [/style.css/, /bundle.js/], // Exclude style and bundle links for generated html files
      template: './src/html/index.html',
      filename: `${process.env.ASSETS_FOLDER}/index.html`,
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
  ],
};
