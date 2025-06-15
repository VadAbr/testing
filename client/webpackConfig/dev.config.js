const { merge } = require('webpack-merge')
const common = require('./common.config')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const plugins = [new ReactRefreshWebpackPlugin()]

module.exports = merge(common, {
  mode: 'development',
  target: 'web',
  plugins,
  devtool: 'eval-source-map',
  output: {
    filename: '[name].[contenthash].js',
  },
})
