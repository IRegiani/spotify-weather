const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const mode = process.env.NODE_ENV === 'local' ? 'development' : 'production';
const gitCommit = require('child_process').execSync('git rev-parse HEAD').toString().trim();

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.resolve(rootPath, 'src');

/* eslint-disable no-console */
console.log('');
console.log('BUILDING!');
console.log(`mode: ${mode} commit: ${gitCommit}`);
console.log('');
/* eslint-enable no-console */

module.exports = {
  mode,
  entry: path.resolve(srcPath, 'index.jsx'),
  output: {
    filename: 'bundle-[hash].js',
    publicPath: '/',
    path: path.resolve(rootPath, 'build'),
  },
  module: {
    rules: [
      { test: /\.js|jsx$/, use: ['babel-loader', 'eslint-loader'], exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      // favicon: path.join(srcPath, path.join('static', '')),
    }),
    new webpack.EnvironmentPlugin(['SPOTIFY_CLIENT_ID', 'OPEN_WEATHER_KEY']),
  ],
  optimization: {
    minimize: mode !== 'development',
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    useLocalIp: true,
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 9000,
    host: '0.0.0.0',
    stats: 'errors-only',
  },
};
