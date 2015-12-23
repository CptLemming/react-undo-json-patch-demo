'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval-source-map',
  debug: true,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src', 'js', 'main.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  }
};
