const {distRoot, entryFile} = require('./config');
const gulp = require('gulp');
const webpackBase = require('./webpack.base.config');
const webpack = require('webpack');
const gulpSequence = require('gulp-sequence');
const del = require('del');
const webpackMerge = require('webpack-merge');
const shell = require('shelljs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isStage = process.env.NODE_ENV === 'stage';

const webpackDist = webpackMerge(webpackBase, {
  entry: `../${entryFile}`,
  output: {
    filename: "js/[name].[chunkhash].js"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new MiniCssExtractPlugin({
      filename: `styles/[name].[contenthash].css`,
    })
  ]
});

gulp.task('clean', function (cb) {
  del(distRoot + '/**', {
    force: true
  }).then(function () {
    cb()
  });
});

gulp.task('pack', function (cb) {
  webpack(webpackDist, function () {
    new Promise(function (resolve) {
      resolve()
    }).then(function (error) {
      if (error) {
        console.log(error);
      } else {
        cb();
      }
    })
  });
});

gulp.task('upload', function () {
  shell.exec("rsync -avz -r -P ../dist/ linkface@100.66.225.20:/home/linkface/nginx-http-root/fans");
});

gulp.task('build', function () {
  let actions = ['clean', 'pack'];

  if (isStage) {
    actions.push('upload');
  }

  gulpSequence(...actions, function () {
  });
});