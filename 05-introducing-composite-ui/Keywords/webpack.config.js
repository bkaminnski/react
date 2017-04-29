var path = require('path');

module.exports = {
  entry: './src/keywords.js',
  output: {
    path: path.join(__dirname, '../Links/'),
    filename: 'keywords-bundle.js'
  },
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
  },
};