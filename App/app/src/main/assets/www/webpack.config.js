var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./lib/app.js",
  output: {
    path: __dirname + "/lib",
    filename: "bundle.js"
  },
  plugins: debug ? [] : [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
  module:  {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
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
