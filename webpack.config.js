const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const config = {
  devtool: 'sourcemap',
  context: path.resolve(__dirname, 'source'),
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },

      { test: /\.(html)$/, use: 'html-loader' },

      {
        test: /\.css$/,
        use: env === 'production'
          ? ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [ 'css-loader' ]
          })
          : [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: env === 'production'
  ? [
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new ExtractTextPlugin({
        filename: '[name].css'
      })
    ]
  : [
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ],
  watch: true
};

module.exports = config;