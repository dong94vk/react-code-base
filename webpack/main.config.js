const path = require("path");
var webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const _ = require("lodash");
const util = require("./util.config.js");

var basePath = __dirname;
const extractCSS = util.extractCSS;
const getParameters = util.getParameters;
const getRules = util.getRules;
/** *********** END : IMPORT AREA ********** */

const moduleHtmls = [
  {
    title: "Box Social",
    filename: "index.html",
    chunks: ["manifest", "vendor", "app"],
  },
];

const erpModuleChunks = [
  { key: "app", path: "./App.tsx" },
];

const getEntryPoint = (options) => {
  const { dir, env } = getParameters(options);
  const entryPoints = {};

  erpModuleChunks.map((data) => {
    entryPoints[data.key] = path.join(dir.app, data.path);
    return true;
  });

  return entryPoints;
};

/* BEGIN DEFINE PLUGIN */
const getPlugins = (options) => {
  const { env, isDebug, isProduction, dir, projectPath } = getParameters(
    options
  );

  const plugins = [];
  plugins.push(extractCSS);
  plugins.push(new Dotenv({ path: `./webpack/${env}/.env` }));
  plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
  plugins.push(
    new webpack.EnvironmentPlugin({
      NODE_ENV: isProduction ? "production" : "development",
      DEBUG_MODE: !!isDebug,
    })
  );

  const htmlMinifyOptions = {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    html5: true,
    minifyCSS: true,
    removeComments: true,
    removeEmptyAttributes: true,
  };

  moduleHtmls.map((data) => {
    _.assign(data, {
      template: `${dir.assets}/index.html`,
      minify: isProduction ? htmlMinifyOptions : false,
      alwaysWriteToDisk: true,
      inject: true,
    });
    return plugins.push(new HtmlWebpackPlugin(data));
  });

  plugins.push(
    new CleanWebpackPlugin({
      verbose: true,
      dry: false,
    })
  );

  // production builds
  if (isProduction) {
    plugins.push(new CompressionPlugin());
  } else {
    plugins.push(new HtmlWebpackHarddiskPlugin({}));
  }

  plugins.push(
    new CopyWebpackPlugin([
      { from: `${dir.assets}/images`, to: `${dir.build}/images` },
    ])
  );

  return plugins;
};
/* END DEFINE PLUGIN */

const getConfig = function (options) {
  const { isProduction, dir } = getParameters(options);
  const plugins = getPlugins(options);

  return {
    context: dir.app,
    devtool: !isProduction ? "inline-sourcemap" : false,
    entry: getEntryPoint(options),
    output: {
      path: dir.build,
      filename: "js/[name].js?v=[hash]",
      publicPath: "/",
    },
    module: {
      rules: getRules(options),
    },
    devServer: {
      historyApiFallback: true,
      port: 8080,
      disableHostCheck: true,
      host: "box-dev.studio",
      open: true,
      inline: true,
      contentBase: dir.build,
    },
    plugins,
    resolve: {
      modules: [dir.app, dir.assets, path.resolve("./node_modules")],
      extensions: [
        ".js",
        ".jsx",
        ".json",
        ".ts",
        ".tsx",
        "png",
        "jpg",
        "svg",
        "scss",
        "css",
      ],
    },
    node: {
      fs: "empty",
      net: "empty",
      tls: "empty",
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        name: "vendor",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin({}),
        new OptimizeCSSAssetsPlugin({
          cssProcessor: require("cssnano"),
          cssProcessorPluginOptions: {
            preset: ["default", { discardComments: { removeAll: true } }],
          },
          canPrint: true,
        }),
      ],
    },
  };
};

module.exports = getConfig;
