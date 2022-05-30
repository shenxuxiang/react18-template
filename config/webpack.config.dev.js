const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const env = require('./environment.dev.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: path.resolve('src/index.tsx'),
  output: {
    clean: true,
    path: path.resolve('dist'),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: env.PUBLIC_PATH,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve('node_modules')],
    alias: {
      '@': path.resolve('src/'),
    },
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      maxSize: 50000,
      minSize: 25000,
      minRemainingSize: 25000,
      maxInitialRequests: 30,
      maxAsyncRequests: 30,
      enforceSizeThreshold: 50000,
      minChunks: 2,
    },
  },
  cache: true,
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(tsx?|jsx?)$/,
            include: path.resolve('src'),
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            }
          }, {
            test: /\.module\.css$/,
            include: path.resolve('src'),
            use: styleLoader({
              url: true,
              import: true,
              importLoaders: 2,
              modules: {
                auto: true,
                mode: 'local',
                localIdentName: '[path][name]-[local]-[hash:base64:5]'
              },
            })
          }, {
            test: /\.css$/,
            include: path.resolve('src'),
            use: styleLoader({
              url: true,
              import: true,
              importLoaders: 2,
              modules: false,
            }),
          }, {
            test: /\.module\.less$/,
            include: path.resolve('src'),
            use: styleLoader({
              url: true,
              import: true,
              importLoaders: 2,
              modules: {
                auto: true,
                mode: 'local',
                localIdentName: '[path][name]-[local]-[hash:base64:5]'
              },
            }, require.resolve('less-loader'))
          }, {
            test: /\.less$/,
            include: path.resolve('src'),
            use: styleLoader({
              url: true,
              import: true,
              importLoaders: 2,
              modules: false,
            }, require.resolve('less-loader'))
          }, {
            test: /\.(jpg|jpeg|png|gif|bmp)$/,
            include: path.resolve('src'),
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10000,
              },
            },
            generator: {
              emit: true,
              filename: 'static/images/[name].[hash:8].[ext]',
              publicPath: env.PUBLIC_PATH,
            }
          }, {
            test: /\.(ttf|woff2?|eot)$/,
            type: 'asset',
            include: path.resolve('src'),
            parser: {
              dataUrlCondition: {
                maxSize: 10000,
              },
            },
            generator: {
              emit: true,
              filename: 'static/font/[name].[hash:8].[ext]',
              publicPath: env.PUBLIC_PATH,
            }
          }, {
            test: /\.svg$/,
            include: path.resolve('src'),
            loader: require.resolve('@svgr/webpack'),
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ts-webpack-demo',
      template: path.resolve('public/index.html'),
      filename: 'index.html',
      scriptLoading: 'blocking',
      inject: true,
    }),
    new webpack.DefinePlugin({
      'process.env': Object.keys(env).reduce((memo, key) => {
        memo[key] = JSON.stringify(env[key]);
      }, {}),
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    port: 3001,
    host: '0.0.0.0',
    open: ['/'],
    hot: true,
    client: {
      logging: 'none',
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    compress: true,
    historyApiFallback: true,
  }
}

function styleLoader(options, loader) {
  return [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options,
    },
    require.resolve('postcss-loader'),
    loader && require.resolve('less-loader'),
  ].filter(Boolean);
}
