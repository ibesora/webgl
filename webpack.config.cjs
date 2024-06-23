const path = require("path");

const folders = [
  "1.hello-world",
  "2.pixels",
  "3.color",
  "4.single-draw-call",
  "5.textures",
];

const files = folders.reduce((acc, folder) => {
  acc[`${folder}`] = `./src/${folder}/script.ts`;
  return acc;
}, {});

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
      {
        test: /\.(glsl|vs|fs)$/,
        loader: "ts-shader-loader",
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
