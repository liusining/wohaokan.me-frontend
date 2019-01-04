const {distRoot, entryFile} = require('./config');
const gulp = require('gulp');
const webpackBase = require('./webpack.base.config');
const webpack = require('webpack');
const del = require('del');
const webpackMerge = require('webpack-merge');
const shell = require('shelljs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isStage = process.env.NODE_ENV === 'stage';

const isBundle = process.env.BUNDLE === 'bundle';

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new MiniCssExtractPlugin({
    filename: `styles/[name].[contenthash].css`,
  })
];

if (isBundle) {
  plugins.push(new BundleAnalyzerPlugin());
}

const webpackDist = webpackMerge(webpackBase, {
  entry: `../${entryFile}`,
  mode: 'production',
  output: {
    filename: "js/[name].[chunkhash].js"
  },
  plugins
});

function clean(cb) {
  del(distRoot + '/**', {
    force: true
  }).then(function () {
    cb()
  });
}


function pack(cb) {
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
}

function upload(cb) {
  shell.exec("rsync -e ssh -avz -r -P ../dist/ ubuntu@stg.wohaokan.me:/home/ubuntu/stg.wohaokan.me/frontend");
  cb();
}

let arr = [clean, pack];
if (isStage) {
  arr.push(upload);
}

gulp.task('build', gulp.series(...arr));