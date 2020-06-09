// Webpack v4
require('dotenv').config()

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: './index.js'
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        // Set to true if you want JS source maps
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  // Output app js
  output: {
    path: path.resolve(
      __dirname,
      `${process.env.PUBLIC_PATH}/${process.env.ASSETS_FOLDER}`
    )
  },
  module: {
    rules: [
      {
        test: /\.js/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: true,
          configFile: './.eslintrc.json'
        }
      },
      {
        // Babel
        test: /\.js/,
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
            loader: 'url-loader',
            options: {
              // If less than 10 kb, add base64 encoded image to css if not reference to file in  assets/img/
              limit: false,
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
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: `${process.env.PUBLIC_PATH}/${process.env.ASSETS_FOLDER}`
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/img',
        to: path.resolve(
          __dirname,
          `${process.env.PUBLIC_PATH}/${process.env.ASSETS_FOLDER}/img`
        ),
        ignore: ['.gitignore', '.gitkeep']
      }
    ]),
    new HtmlWebPackPlugin({
      excludeAssets: [/style.css/, /bundle.js/], // Exclude style and bundle links for generated html files
      template: './src/html/index.html',
      filename: path.resolve(__dirname, `${process.env.PUBLIC_PATH}/index.html`)
    }),
    new HtmlWebpackExcludeAssetsPlugin()
  ]
}
