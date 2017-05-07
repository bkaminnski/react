var path = require('path');

module.exports = {
  entry: './src/formComponent.js',
  output: {
    path: path.join(__dirname, '../MainApplication/'),
    filename: 'formComponent-bundle.js'
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
  }
};