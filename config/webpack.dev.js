const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
    mode: "development",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        assetModuleFilename: "[name][ext]",
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
});