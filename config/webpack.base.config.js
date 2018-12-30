const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const path = require('path');
const config = require('./config');

// 是否是生产环境
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  output: {
    path: config.distRoot,
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.vue?$/,
      include: [
        `${config.rootPath}/src`,
      ],
      loader: 'vue-loader'
    }, {
      test: /\.(eot|svg|ttf|woff|png|jpe?g|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          // 限制为10k，如果超过10k，url-loader会自动使用file-loader加载
          limit: 10 * 1024,
          name: '[hash]-[name].[ext]',
          outputPath: 'images/',
          publicPath: '/images/',
        }
      }]
    }, {
      test: /\.(scss|css)$/,
      use: [
        isProduction ? MiniCssExtractPlugin.loader : 'style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')
            ],
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
    }]
  },
  resolve: {
    modules: ['./src/', path.resolve(__dirname, '../node_modules')],
    extensions: ['.vue', '.js', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../index.html')
    })
  ]
};