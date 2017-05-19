var htmlWebpackPlugin = require("html-webpack-plugin");
var openBrowserWebpackPlugin = require("open-browser-webpack-plugin");
var extractTextWebpackPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
module.exports = {
    entry: {
        "js/other": ["./app/js/angular.js", "./app/js/zepto.min.js"],
        "js/bundle": "./app/js/index.js"
    },
    output: {
        path: "./build/",
        filename: "[name].[hash:8].js"
    },
    plugins: [
        new htmlWebpackPlugin({
            title: "webpack",
            template: "./app/index.html",
            chunks: ["js/common.js", "js/other", "js/bundle"]
        }),
        new openBrowserWebpackPlugin({url: "http://localhost:8080"}),
        new extractTextWebpackPlugin("bundle.css"),
        new webpack.optimize.CommonsChunkPlugin('js/common.js'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {test: /\.js$/,exclude: /node_modules/, loaders: ['babel']},
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.(png|jpg|gif)$/,
                loaders:["url?limit=8192"]
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000"
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".css", ".jsx"]
    }
};