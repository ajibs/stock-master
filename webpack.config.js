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
    /**
     * Many libraries will key off the process.env.NODE_ENV variable to determine what should be included in the library.
     * For example, when not in production some libraries may add additional logging and testing to make debugging easier
     * with process.env.NODE_ENV === 'production' they might drop or add significant portions of code to optimize how things run for your actual users
     * We use webpack's built in DefinePlugin to define this variable for all our dependencies
     */
    new webpack.DefinePlugin({
      // plugin does a direct text replacement; hence the double quotes
      'process.env.NODE_env': '"production"'
    })
  ]
};


module.exports = config;
