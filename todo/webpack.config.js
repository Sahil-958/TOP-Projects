const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //mode: "development",
  mode: "production",
  entry: {
    index: "./src/index.js",
  },
  devtool: "inline-source-map",
  //devServer: {
  //  static: "./dist",
  //},
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      watch: true,
    },
    liveReload: true,
    watchFiles: ["src/**/*.{js,css,html,scss}"], // Watch for changes in these files
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "ToDo's",
      template: "./src/index.html",
      scriptLoading: "defer",
    }),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    //clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
  },
};
