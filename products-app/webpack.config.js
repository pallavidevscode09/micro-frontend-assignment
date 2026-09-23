const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",

  entry: "./src/main.jsx",

  devServer: {
    port: 3001,

    historyApiFallback: true,
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  output: {
    publicPath: "http://localhost:3001/",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "products",

      filename: "remoteEntry.js",

      exposes: {
        "./ProductsList": "./src/ProductsList.jsx",
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
};
