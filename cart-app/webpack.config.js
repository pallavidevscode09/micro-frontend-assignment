const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",

  entry: "./src/main.jsx",

  output: {
    publicPath: "http://localhost:3002/",
    clean: true,
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "cart",

      filename: "remoteEntry.js",

      exposes: {
        "./CartList": "./src/CartList.jsx",
      },

      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
        },

        "react-dom": {
          singleton: true,
          requiredVersion: false,
        },

        "react-router-dom": {
          singleton: true,
          requiredVersion: false,
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  devServer: {
    port: 3002,

    historyApiFallback: true,

    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};