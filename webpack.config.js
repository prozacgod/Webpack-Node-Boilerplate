var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var readJson = require('read-package-json');

var packageData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')));

process.traceDeprecation = true;
process.noDeprecation = true;

var babelOptions = packageData.babel;

var config = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: '#source-map',
  plugins: [
    new webpack.BannerPlugin({banner: 'var CONFIG = require("config");', raw: true, entryOnly: true})
  ],
  module: {
    loaders: [
      { test: /config$/, loader: 'ignore-loader' }
    ],
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        }
      }
    ]
  }
};


module.exports = config;
