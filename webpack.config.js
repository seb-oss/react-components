const path = require("path");
const webpack = require("webpack");
const components = require("./src/index");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const buildType = process.argv[2].replace(/\-/g, "");

// Common Config
let buildConfig = {
    devtool: false,
    target: "web",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader", exclude: [/node_modules/, /\.(test)\.ts$/] },
            { test: /(\.css|\.scss|\.sass)$/, loaders: ["style-loader", "css-loader", "sass-loader", "postcss-loader"] },
            { test: /\.ico$/, loader: "file-loader?name=[name].[ext]" },
            { test: /\.(mp4|webm|ogg)$/i, loader: "file-loader?name=assets/videos/[name].[ext]" },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: "file-loader?prefix=font/&limit=5000&name=assets/fonts/[name].[ext]" },
            { test: /\.(woff|woff2)$/, loader: "file-loader?prefix=font/&limit=5000&name=assets/fonts/[name].[ext]" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?limit=10000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]" },
            { test: /\.md$/, loaders: ["html-loader", "markdown-loader"] },
        ],
    },
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: false,
        setImmediate: false,
    },
};

// Specific config
switch (buildType) {
    case "dev":
        buildConfig = {
            ...buildConfig,
            mode: "development",
            devtool: "source-map",
            devServer: {
                contentBase: "./dist",
                port: 3000,
                stats: {
                    modules: false,
                    version: false,
                    timings: false,
                    builtAt: false,
                    hash: false,
                    excludeAssets: /\.(woff2?|ttf|eot|map)$/,
                },
            },
            plugins: [
                new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
                new HtmlWebpackPlugin({
                    template: "./develop/index.dev.html",
                    filename: "./index.html",
                }),
            ],
        };
        buildConfig.module.rules[0].options = { configFile: "develop/tsconfig.json" };
        break;
    case "docs":
        buildConfig = {
            ...buildConfig,
            mode: "production",
            plugins: [
                new webpack.DefinePlugin({ "process.env.NODE_ENV": "production" }),
                new HtmlWebpackPlugin({
                    template: "./develop/index.html",
                    filename: "./index.html",
                }),
                new CopyWebpackPlugin([{ from: "./develop/version.json" }, { from: "./develop/targetindex.json" }, { from: "./develop/contentindex.json" }]),
            ],
        };
        break;
    case "prod":
        buildConfig = {
            ...buildConfig,
            mode: "production",
            entry: components.paths,
            output: {
                filename: "[name]/[name].js",
                path: path.resolve(__dirname, "dist"),
                library: "react-components",
                libraryTarget: "umd",
                umdNamedDefine: true,
            },
            externals: {
                react: {
                    commonjs: "react",
                    commonjs2: "react",
                    amd: "React",
                    root: "React",
                },
                "react-dom": {
                    commonjs: "react-dom",
                    commonjs2: "react-dom",
                    amd: "ReactDOM",
                    root: "ReactDOM",
                },
            },
            plugins: [new webpack.DefinePlugin({ "process.env.NODE_ENV": "production" }), new CopyWebpackPlugin(components.indexes), new CaseSensitivePathsPlugin()],
        };
        buildConfig.module.rules.push(
            { test: /\.(jpe?g|png|gif)$/i, loader: "file-loader?name=assets/images/[name].[ext]" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=assets/svgs/[name].[ext]" }
        );
        break;
}

// Common between docs and dev
if (buildType !== "prod") {
    buildConfig = {
        ...buildConfig,
        context: __dirname,
        entry: { app: ["babel-polyfill", "./develop/index.tsx"] },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "docs"),
            chunkFilename: "js/[name].bundle.js",
            publicPath: "",
        },
    };
    buildConfig.module.rules.push(
        {
            test: /\.(jpe?g|png|gif)$/i,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        esModule: false,
                        name: "assets/images/[name].[ext]",
                    },
                },
            ],
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        esModule: false,
                        limit: 10000,
                        mimetype: "image/svg+xml",
                        name: "assets/svgs/[name].[ext]",
                    },
                },
            ],
        }
    );
}

module.exports = buildConfig;
