const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = merge(common, {
    mode: "production",

    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].[contenthash].bundle.js",
        assetModuleFilename: "assets/[name][ext]",
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({ filename: "main.[contenthash].css" }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
});