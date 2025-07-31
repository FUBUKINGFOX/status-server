const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/public/src/main/main.js',
  output: {
    path: path.resolve(__dirname, './src/public/main/js'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};