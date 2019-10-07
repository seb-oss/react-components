const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    context: __dirname,
    target: 'web',
    devtool: false,
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    entry: {
        app: ["babel-polyfill", "./develop/index.tsx"]
    },
    output: {
        filename: '[name].js',
        chunkFilename: 'js/[name].bundle.js',
        publicPath: '',
        path: path.resolve(__dirname, 'docs')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new HtmlWebpackPlugin({
            "template": "./develop/index.html",
            "filename": "./index.html"
        }),
        new CopyWebpackPlugin([
            { from: './develop/version.json' },
            { from: './develop/targetindex.json' },
            { from: './develop/contentindex.json' },
        ])
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/, loader: "ts-loader",
                exclude: [/\.(test)\.ts$/],
                options: {
                    configFile: "tsconfig.json"
                }
            },
            { test: /(\.css|\.scss|\.sass)$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.md$/, loaders: ['html-loader', 'markdown-loader'] },
            { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=assets/images/[name].[ext]' },
            { test: /\.(mp4|webm|ogg)$/i, loader: 'file-loader?name=assets/videos/[name].[ext]' },
            { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?prefix=font/&limit=5000&name=assets/fonts/[name].[ext]' },
            { test: /\.(woff2?)$/, loader: 'file-loader?prefix=font/&limit=5000&name=assets/fonts/[name].[ext]' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml&name=assets/svgs/[name].[ext]' }
        ]
    },
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: false,
        setImmediate: false
    }
};
