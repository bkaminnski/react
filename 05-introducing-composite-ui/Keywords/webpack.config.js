module.exports = {
  entry: './src/keywords.js',
  output: {
    path: '../Links/',
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