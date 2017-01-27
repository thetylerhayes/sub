var path = require('path');
var _ = require("lodash");
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var url = require('url');
var paths = require('./paths');
var fs = require("fs");
var WEBPACK_ENV = JSON.stringify(process.env.WEBPACK_ENV || 'local');
const BOT_PATH = path.join(paths.appSrc, "bot");

const NODE_VALUE = {
  console: true,
  fs: 'empty',
  net: 'empty',
  tls: 'empty'
}

const widget_id = require(paths.appPackageJson).name;

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


const PLUGINS = [
  new webpack.DefinePlugin(WEBPACK_ENV),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    comments: false,
    mangle: true
  })
].filter((pl) => {
  if (pl) {
    return true
  }
});

let _baseConfig = {
  bail: true,
  devtool: 'source-map',
  target: "web",
  entry: {
    index: [
      require.resolve('./polyfills'),
      path.join(paths.appSrc, 'index')
    ]
  },
  output: {
    path: paths.appBuild,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    library: widget_id,
    libraryTarget: "window"
  },
  resolveLoader: {
    root: paths.ownNodeModules,
    moduleTemplates: ['*-loader']
  },
  node: NODE_VALUE,
  module: {
    loaders: [
      // Process JS with Babel.
      {
        test: /\.js|\.jsx?$/,
        include: paths.appSrc,
        loader: 'babel',
        query: require('./babel.js'),
        exclude: path.resolve(__dirname, 'node_modules/')
      }, {
        test: require.resolve(BOT_PATH),
        loader: `exports`
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        exclude: /\/favicon.ico$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[ext]'
        }
      }
    ]
  },
  eslint: {
    configFile: path.join(__dirname, 'eslint.js'),
    useEslintrc: false
  },
  plugins: PLUGINS
};

let _botConfig = _.cloneDeep(_baseConfig);
_botConfig.entry = { bot: path.join(paths.appSrc, "bot") }
_botConfig.output.libraryTarget = "commonjs2";
_botConfig.target = "node";
let _serverConfig = _.cloneDeep(_baseConfig);
_serverConfig.target = "node";
_serverConfig.output.libraryTarget = "global";
_serverConfig.output.filename = 'index.node.js';
_serverConfig.externals = nodeModules;

module.exports = {
  index: _baseConfig,
  bot: _botConfig,
  server: _serverConfig
}
