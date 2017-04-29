var path = require('path');

module.exports = {
  entry: './src/description.js',
  output: {
    path: path.join(__dirname, '../Links/'),
    filename: 'description-bundle.js'
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