const { merge } = require('webpack-merge')
const common = require('./common.config')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  target: 'browserslist',
  devtool: false,
  output: {
    filename: '[fullhash].js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        parallel: true,
        terserOptions: {
          mangle: true,
          compress: true,
          output: {
            beautify: false,
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
})
