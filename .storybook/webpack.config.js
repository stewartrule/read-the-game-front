const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx"]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../public"),
        to: path.resolve(__dirname, "../.out"),
        ignore: ["index.html"]
      }
    ])
  ],

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, "../src/"),
        use: [
          require.resolve("ts-loader"),
          require.resolve("react-docgen-typescript-loader")
        ]
      },

      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};
