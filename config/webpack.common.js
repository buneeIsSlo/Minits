const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: {
        app: path.resolve(__dirname, "../src/js/app.js")
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },

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
        }),

    ]
};