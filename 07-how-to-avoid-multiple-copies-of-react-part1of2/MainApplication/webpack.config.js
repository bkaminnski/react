var webpack = require("webpack");

module.exports = {
  entry: {
    app: './src/mainApplication.js',
    vendor: ["PubSub-js"]
  },
  output: { path: __dirname, filename: 'mainApplication-bundle.js' },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.bundle.js" })
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
      }
    ]
  }
};