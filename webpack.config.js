/**
 * webpack config for development
 * I would switch in production: to Philip Walton's configs for shipping ES6+
 */

const path = require('path');
const webpack = require('webpack');


const javascript = {
  test: /\.(js)$/,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: ['env']
    }
  }]
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
    rules: [javascript]
  },
  plugins: [
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
