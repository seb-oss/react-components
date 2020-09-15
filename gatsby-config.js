/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
        title: "SEB React Components",
    },
    plugins: [
        "gatsby-plugin-sass",
        "gatsby-plugin-postcss",
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-plugin-tsconfig-paths",
            options: {
                configFile: `${__dirname}/src/tsconfig.json`,
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
