const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'app.bundle.js',
  },
  resolve: {
    fallback: {
      timers: require.resolve('timers-browserify'),
    },
  },
};
