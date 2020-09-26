var webpack = require("webpack");
const version = require("./package.json").version;
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//const HtmlPlugin           = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

const banner =
    `/* **********************************
EasyAnnotation.js version ${version}
https://easyannotation.com

Copyright Andrei Beleuta
see README.md and LICENSE for details
********************************** */`;


module.exports = {
  mode: 'production',
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    library: "VueEasyAnnotation",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
   // new HtmlPlugin({ template: 'index.html'}),
    new webpack.BannerPlugin({
      banner: banner,
      raw: true
    })
  ],
  resolve: {
    modules: [__dirname, path.resolve('node_modules')],
    extensions: ['.js'],
  },
  externals: {
    easyannotation: "easyannotation"
  }
  
};