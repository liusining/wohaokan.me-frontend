const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const {entryFile} = require('./config');

const port = 9901;

module.exports = webpackMerge(baseConfig, {
  entry: `./${entryFile}`,
  mode: 'development',
  output: {
    filename: "js/[name].bundle.js",
    chunkFilename: 'js/[name].chunk.js'
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    inline: true,
    open: true,
    port,
    publicPath: `http://localhost:${port}`,
    watchContentBase: true,
    watchOptions: {
      poll: true,
      aggregateTimeout: 300
    },
    stats: {colors: true},
    historyApiFallback: true,
    disableHostCheck: true
  }
});