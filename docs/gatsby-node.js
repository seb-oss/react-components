const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find((plugin) => plugin.constructor.name === "MiniCssExtractPlugin");
    if (miniCssExtractPlugin) {
        miniCssExtractPlugin.options.ignoreOrder = true;
    }
    actions.setWebpackConfig({
        resolve: {
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: `${__dirname}/tsconfig.json`,
                    silent: true,
                }),
            ],
            fallback: {
                os: require.resolve("os-browserify/browser"),
                path: require.resolve("path-browserify"),
            },
        },
    });
};
