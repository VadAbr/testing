const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, '..', 'build')
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public')
const SRC_DIR = path.resolve(__dirname, '..', 'src')

const APP_DIR = path.resolve(SRC_DIR, 'app')
const PAGES_DIR = path.resolve(SRC_DIR, 'pages')
const WIDGETS_DIR = path.resolve(SRC_DIR, 'widgets')
const FEATURES_DIR = path.resolve(SRC_DIR, 'features')
const ENTITIES_DIR = path.resolve(SRC_DIR, 'entities')
const SHARED_DIR = path.resolve(SRC_DIR, 'shared')

const SERVER_URL = 'http://localhost:8085'

const plugins = [
  new HtmlWebpackPlugin({
    template: path.join(PUBLIC_DIR, 'index.html'),
    filename: 'index.html',
  }),
]

const devServer = {
  historyApiFallback: true, // Apply HTML5 History API if paths are used
  open: true,
  compress: true,
  allowedHosts: 'all',
  proxy: [
    // API
    {
      context: ['/api'],
      target: SERVER_URL,
    },
  ],
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },
  client: {
    // Shows a full-screen overlay in the browser when there are compiler errors or warnings
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  port: 3001,
}

module.exports = {
  plugins,
  devServer,
  entry: path.join(SRC_DIR, 'index.tsx'),
  output: {
    path: BUILD_DIR,
    /**
     * Helps to avoid of MIME type ('text/html') is not a supported stylesheet
     * And sets address in html imports
     */
    publicPath: '/',
    clean: true,
  },
  // Checking the maximum weight of the bundle is disabled
  performance: {
    hints: false,
  },
  // Modules resolved
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
    alias: {
      '@app': APP_DIR,
      '@pages': PAGES_DIR,
      '@widgets': WIDGETS_DIR,
      '@features': FEATURES_DIR,
      '@entities': ENTITIES_DIR,
      '@shared': SHARED_DIR,
    },
  },
  module: {
    strictExportPresence: true, // Strict mod to avoid of importing non-existent objects
    rules: [
      // --- JS | TS USING SWC-loader
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              transform: { react: { runtime: 'automatic', refresh: true } },
              parser: { syntax: 'typescript', tsx: true, dynamicImport: true },
            },
          },
        },
      },
      // --- S/A/C/SS
      {
        test: /\.(s[ac]|c)ss$/i,
        exclude: [path.resolve(__dirname, '../node_modules'), path.resolve(APP_DIR, 'styles')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]', // format of output
              },
            },
          },
          {
            // autoprefixer
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        include: [path.resolve(__dirname, '../node_modules'), path.resolve(APP_DIR, 'styles')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]',
              },
            },
          },
          {
            // autoprefixer
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      // --- Images/fonts/svg
      { test: /\.(?:ico|gif|png|jpg|jpeg|xlsx|xlsm)$/i, type: 'asset/resource' },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
}
