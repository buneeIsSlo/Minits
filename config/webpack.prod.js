const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",

    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].[contenthash].bundle.js",
        assetModuleFilename: "assets/[name].[contenthash][ext]",
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
    ],
});