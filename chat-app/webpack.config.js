const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const ROOT_DIR = path.join(__dirname, './');
const SRC_DIR = path.join(ROOT_DIR, 'src');

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(SRC_DIR, 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, "bundle"),
    publicPath: '/'
  },

  stats: {
    children: false,
    chunks: false,
    assets: false,
  },

  performance: {
    hints: false
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "main-css-bundle.[contenthash].css" }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIR, 'public/index.html'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, "src")],
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      {
        test: /.(css|modules.css)$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",

            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: function () {
                  return [precss, autoprefixer];
                },
              },
            },
          }]
      },
      {
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
        type: 'javascript/auto',
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        /* Fonts and Images */
        test: /\.(png|ico|jp(g|eg)|ttf|eot|otf|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: (url, resourcePath, context) => {
            return `${resourcePath.split('/public/')[1]}`;
          }
        },
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(ROOT_DIR, 'public/assets/icons')
        ],
        use: [{
          loader: '@svgr/webpack',
          options: {
            icon: true,
          }
        }, 'url-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.svg$/,
        use: ['url-loader'],
      }
    ]
  },

  devServer: {
    open: true,
    host: "localhost",
    port: 5000,
    historyApiFallback: true,
  },
};
