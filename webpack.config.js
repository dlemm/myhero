const webpack = require('webpack');
const path = require('path');

const content = require('./ressources/content.json');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};