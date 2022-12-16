const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: path.resolve(__dirname, "../src/js/app.js")
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, "../dist")
        },
        port: 5001
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: "html-loader"
            },

            {
                test: /\.(svg|ico|webp|png|jpg|jpeg|gif|mp3|wav)$/,
                type: "asset/resource"
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "../src/index.html")
        })
    ]
};