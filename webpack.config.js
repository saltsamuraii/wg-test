const path = require ('path');
const webpack = require ('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const isProd = process.env.NODE_ENV === "production";

module.exports = {
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "eval",

    entry: "./src/index.tsx",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            //
            // Loading styles
            //
            {
                test: /\.css$/,
                use: [ isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"]
            },
            //
            // Loading images
            //
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            //
            // Loading fonts
            //
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: "asset/inline",
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "WG-test",
            template: path.resolve(__dirname, "public/index.html"),
            filename: "index.html",
            base: '',
        }),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new FaviconsWebpackPlugin({
            logo: path.resolve(__dirname, "public/wow.png"),
            inject: true,
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                favicons: true,
                firefox: true,
                opengraph: true,
                twitter: true,
                windows: true
              }
        },
        ),
    ],
    devServer: {
        static: path.resolve(__dirname, "dist"),
        open: true,
        compress: true,
        port: 8000,
        historyApiFallback: true,
        hot: true,
    },
};