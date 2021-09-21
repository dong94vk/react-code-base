/* tslint:disable */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const getParameters = function getParameters(options) {
  const path = require("path");
  const { env, isDebug } = options;
  const projectPath = path.resolve(__dirname, "../");
  return {
    env,
    isDebug,
    projectPath,
    isProduction: env === "prod" || env === "stg",
    dir: {
      app: `${projectPath}/src`,
      assets: `${projectPath}/assets`,
      build: `${projectPath}/dist/${env}`,
      node_modules: `${projectPath}/node_modules`,
    },
  };
};

const extractCSS = new MiniCssExtractPlugin({
  filename: "css/[name]-[hash].css",
});

const getRules = function (options) {
  const { dir, isProduction } = getParameters(options);
  return [
    {
      test: /\.tsx?$/,
      loader: "awesome-typescript-loader",
    },
    {
      test: /\.sass|scss|\.scss|\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: "css-loader",
          options: {
            camelCase: true,
            url: false,
            sourceMap: isProduction,
            modules: false,
            localIdentName: "[local]--[hash:base64:12]",
          },
        },
        {
          loader: "postcss-loader",
          options: {
            plugins: [autoprefixer({ browsers: ["last 2 versions"] })],
          },
        },
        {
          loader: "sass-loader",
          options: {
            includePaths: [`${dir.assets}`],
          },
        },
      ],
    },

    // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
    // Using here url-loader and file-loader
    {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff",
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/octet-stream",
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader",
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=image/svg+xml",
      options: {
        name: "images/[hash]-[name].[ext]",
      },
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192,
            mimetype: "image/png",
            name: "images/[name].[ext]",
          },
        },
      ],
    },
  ];
};

exports.getParameters = getParameters;
exports.extractCSS = extractCSS;
exports.getRules = getRules;
