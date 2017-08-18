var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/app.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },
  plugins: [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new CopyWebpackPlugin([
      { from: 'index.html', to: 'index.html' },
      { from: 'styles', to: 'styles' },
      { from: 'img', to: 'img' },
    ])
  ],
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          attrs: [':data-src']
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline'
      }
    ]
  }
};
