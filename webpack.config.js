const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const styleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const content = require('./ressources/content.json');


// the path(s) that should be cleaned
let pathsToClean = [
  'dist'
]

// the clean options to use.. can be read here https://github.com/johnagan/clean-webpack-plugin
let cleanOptions = {
  verbose:  true, //writes logs to console
  dry:      false, //true would test delete
  allowExternal: false
}

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.twig$/,
        loader: 'twig-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader",
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new HtmlWebpackPlugin (
      {
        template : './src/views/layout/index.twig',
        filename : 'index.html',
        inject: true,
        content
      }
    ),
    new CopyWebpackPlugin (
      [
        {from: './static/assets', to: 'assets'}
      ]
    ),
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
      chunkFilename: "[name].css"
    }),
    new styleLintPlugin({
      configFile: '.stylelintrc.json',
      context: 'src',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
    })
  ]
};