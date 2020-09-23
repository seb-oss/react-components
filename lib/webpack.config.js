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
            { test: /\.tsx?$/, loader: "ts-loader", exclude: [/node_modules/, /\.(test)\.ts$/] },
            { test: /(\.css|\.scss|\.sass)$/, loaders: ["style-loader", "css-loader", "sass-loader", "postcss-loader"] },
            { test: /\.ico$/, loader: "file-loader?name=[name].[ext]" },
            { test: /\.(mp4|webm|ogg)$/i, loader: "file-loader?name=assets/videos/[name].[ext]" },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: "file-loader?prefix=font/&limit=5000&name=assets/fonts/[name].[ext]" },
            { test: /\.(woff|woff2)$/, loader: "file-loader?prefix=font/&limit=5000&name=assets/fonts/[name].[ext]" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?limit=10000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]" },
            { test: /\.(jpe?g|png|gif)$/i, loader: "file-loader?name=assets/images/[name].[ext]" },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?name=assets/svgs/[name].[ext]",
                exclude: [path.resolve(__dirname, "develop")],
            },
        ],
    },
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: false,
        setImmediate: false,
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
    },
    plugins: [new CopyWebpackPlugin({ patterns: components.indexes }), new CaseSensitivePathsPlugin()],
};

module.exports = buildConfig;
