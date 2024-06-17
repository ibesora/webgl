const path = require("path");

const files = {
  "1.hello-world": "./src/1.hello-world/script.ts"
}

module.exports = {
  entry: files,
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "./src/[name]/bundle.js",
    path: path.resolve(__dirname, ""),
  },
};
