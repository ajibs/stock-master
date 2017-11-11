const path = require('path');
// const webpack = require('webpack');


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
  }
};


module.exports = config;
