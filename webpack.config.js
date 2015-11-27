var webpack = require('webpack');

 var config = {
  context: __dirname + "/src",
  entry: './app.js',

  output: {
    filename: "browser.js",
    path: __dirname + "/public/javascripts",
  },
  
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
    ],
  },
};

module.exports = config;
