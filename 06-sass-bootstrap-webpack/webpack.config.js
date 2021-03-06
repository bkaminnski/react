var webpack = require("webpack");

module.exports = {
  entry: {
    app: "./app.js",
    vendor: ["jquery", "bootstrap-sass"],
  },
  output: { path: __dirname, filename: 'bundle.js' },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.bundle.js" }),
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' })
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.woff$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf$/,
        loader: "file-loader"
      },
      {
        test: /\.eot$/,
        loader: "file-loader"
      },
      {
        test: /\.svg$/,
        loader: "file-loader"
      }
    ]
  }
};