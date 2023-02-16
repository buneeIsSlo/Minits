const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
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
            src: path.resolve("src/assets/images/mLogo192.png"),
            sizes: "192x192",
            type: "image/png"
        },
        {
            src: path.resolve("src/assets/images/mLogo192.png"),
            sizes: "512x512",
            type: "image/png"
        }
    ]
};

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

    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({ filename: "main.[contenthash].css" }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
        new WebpackPwaManifest(options)
    ],
});