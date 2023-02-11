const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const options = {
    publicPath: "/",
    filename: "manifest.json",
    name: "Minits Pomodoro Timer",
    short_name: "Minits",
    start_url: "/",
    display: "standalone",
    theme_color: "#202124",
    background_color: "#404040",
    icons: [
        {
            src: path.resolve("src/assets/images/logo192.png"),
            sizes: "192x192",
            type: "image/png"
        },
        {
            src: path.resolve("src/assets/images/logo512.png"),
            sizes: "512x512",
            type: "image/png"
        }
    ]
};

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

        new WebpackPwaManifest(options)
    ]
};