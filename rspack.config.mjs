import path from "node:path";
import rspack from "@rspack/core";

/** @type {import('@rspack/core').Configuration} */
export default {
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    path: path.resolve(import.meta.dirname, "build"),
    filename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@sima-land/ui-nucleons": path.resolve(import.meta.dirname, "src/"),
    },
  },
  module: {
    generator: {
      css: {
        exportsOnly: false,
      },
      "css/auto": {
        exportsOnly: false,
        localIdentName: "[path][name][ext]__[local]",
      },
      "css/module": {
        exportsOnly: false,
        localIdentName: "[path][name][ext]__[local]",
      },
    },
    parser: {
      "css/auto": {
        namedExports: false,
      },
      css: {
        namedExports: false,
      },
      "css/module": {
        namedExports: false,
      },
    },
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "builtin:swc-loader",
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: "typescript",
              jsx: true,
            },
            transform: {
              react: {
                runtime: "automatic",
              },
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.css$/i,
        type: "css",
      },
      {
        test: /\.(module|m)\.css$/i,
        type: "css/module",
      },
      {
        test: /\.(module|m)\.scss$/i,
        use: [
          {
            loader: "sass-loader",
            options: {
              api: "modern-compiler",
              implementation: "sass-embedded",
            },
          },
        ],
        type: "css/module",
      },
      {
        test: /\.(apng|avif|gif|jpg|jpeg|png|webp)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./src/index.html",
      scriptLoading: "module",
      inject: "body",
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: "public",
          to: "public",
        },
      ],
    }),
  ],
  experiments: {
    outputModule: true,
  },
  devServer: {
    hot: false,
    liveReload: true, // also for no reason liveReload is not working
  },
};
