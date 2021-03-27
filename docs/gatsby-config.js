const pkg = require("../package.json");
require("dotenv").config({
    path: `../.env`,
});

module.exports = {
    pathPrefix: process.env.base || pkg.config.base,
    siteMetadata: {
        title: "react-comps",
        siteUrl: "https://sebgroup.github.io/react-components/",
    },
    plugins: [
        "gatsby-plugin-sass",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        "gatsby-plugin-offline",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/assets/images/icon.png",
            },
        },
        {
            resolve: "gatsby-plugin-tsconfig-paths",
            options: {
                configFile: `${__dirname}/tsconfig.json`,
                silent: true,
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /static/,
                },
            },
        },
    ],
};
