const path = require("path");
const components = require("./src/index.json");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

let buildConfig = {
    mode: "production",
    devtool: false,
    target: "web",
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
    module: {
        rules: [
            { test: /\.tsx?$/, use: "ts-loader", exclude: [/node_modules/, /\.(test)\.ts$/] },
            { test: /(\.css|\.scss|\.sass)$/, use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"] },
            { test: /\.ico$/, use: "file-loader?name=[name].[ext]" },
            { test: /\.(mp4|webm|ogg)$/i, use: "file-loader?name=assets/videos/[name].[ext]" },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: "file-loader?prefix=font/&limit=5000&name=assets/fonts/[name].[ext]" },
            { test: /\.(woff|woff2)$/, use: "file-loader?prefix=font/&limit=5000&name=assets/fonts/[name].[ext]" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader?limit=10000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]" },
            { test: /\.(jpe?g|png|gif)$/i, use: "file-loader?name=assets/images/[name].[ext]" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader?name=assets/svgs/[name].[ext]" },
        ],
    },
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
        "@sebgroup/frontend-tools": {
            commonjs: "@sebgroup/frontend-tools",
            commonjs2: "@sebgroup/frontend-tools",
            amd: "@sebgroup/frontend-tools",
            root: "@sebgroup/frontend-tools",
        },
        classnames: {
            commonjs: "classnames",
            commonjs2: "classnames",
            amd: "classnames",
            root: "classnames",
        },
    },
    plugins: [new CopyWebpackPlugin({ patterns: components.indexes }), new CaseSensitivePathsPlugin()],
};

module.exports = buildConfig;
