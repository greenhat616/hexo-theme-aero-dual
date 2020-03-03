const path = require('path');

module.exports = {
  mode: 'production',
  entry: './source/js/_src/app.js',
  output: {
    path: path.join(__dirname, './source/js/'),
    filename: 'app.js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
  
};
