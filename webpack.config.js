'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const nodeEnv = process.env.NODE_ENV || 'development';

const commonConfig = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts',
    'kinksouls': './src/styles/app.scss',
  },

  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['.ts', '.js', '.json',  '.scss', '.css', '.html'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{loader: 'tslint-loader', options: {typeCheck: true}}],
        exclude: /node_modules/,
        enforce: "pre"
      },
      {
        test: /\.html$/,
        use: [{ loader: 'htmlhint-loader', options: { configFile: 'htmlhint.json' } }],
        exclude: /node_modules/,
        enforce: "pre"
      },
      {
        test: /\.ts$/,
        use: [{ loader: 'awesome-typescript-loader' }, { loader: 'angular2-template-loader' }],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader', options: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
            customAttrAssign: [/\)?]?=/],
            root: path.resolve('src')
          }
        }]
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/styles'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            {loader: 'sass-loader', options: {sourceMap: true}}
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
       }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    }),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/images',
      to: 'images'
    }]),
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, 'src'),
      {} // a map of your routes
    ),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    })
  ]
};

const devConfig = {
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({ filename: '[name].bundle.css' })
  ],

  devServer: {
    contentBase: 'src',
    compress: true,
    inline: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 5000,
    stats: 'minimal',
    overlay: true,
    hot: true
  }
};

const prodConfig = {
  devtool: 'source-map',

  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/'
  },

  plugins: [
    new ExtractTextPlugin({filename: '[name].[hash].css'}),
    new LoaderOptionsPlugin({debug: false, minmize: false}),
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        screw_ie8: true,
        warnings: false,
        keep_fnames: true
      },
      mangle: false,
      sourceMap: true
    })
  ]

};

let config;
switch (nodeEnv) {
  case 'production':
    console.info('NODE_ENV: production');
    config = merge(commonConfig, prodConfig);
    break;
  default:
    console.info('NODE_ENV: development');
    config = merge(commonConfig, devConfig);
    break;
}

module.exports = config;
