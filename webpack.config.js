const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.tsx",

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.min.js"
  },

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },

      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },

      {
        test: /\.(graphql|gql)$/,
        use: "graphql-mini-transforms/webpack",
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "public"),
        to: path.resolve(__dirname, "dist"),
        ignore: ["index.html"]
      }
    ])
  ]
};
