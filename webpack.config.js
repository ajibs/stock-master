/**
 * webpack config for development
 * I would switch in production: to Philip Walton's configs for shipping ES6+
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');


const javascript = {
  test: /\.(js)$/,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: ['env']
    }
  }]
};

const styles = {
  test: /\.(css)$/,
  use: ExtractTextPlugin.extract('css-loader')
};

const config = {
  devtool: 'source-map',
  entry: {
    App: './public/js/stock.js'
  },
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [javascript, styles]
  },
  plugins: [
    new ExtractTextPlugin('style.bundle.css'),

    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      canPrint: true
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),

    // removes unnecessary parts of the code for actual users
    new webpack.DefinePlugin({
      // plugin does a direct text replacement; hence the double quotes
      'process.env.NODE_env': '"production"'
    })
  ]
};


module.exports = config;
