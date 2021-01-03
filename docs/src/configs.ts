const pkg = require("../package.json");

export const urls: NavsURLs = {
    releases: "https://github.com/sebgroup/ng-components/releases",
    github: "https://github.com/sebgroup/ng-components/",
    contribute: "https://github.com/sebgroup/ng-components/blob/alpha/CONTRIBUTING.md",
    issues: "https://github.com/sebgroup/ng-components/issues",
    v4: "/v4/index.html",
};

const imageUrl: string = `${pkg.homepage}/site-preview.png`;
const siteName: string = "SEB React Components";

export const metaConfigs: MetaConfig = {
    keywords: "SEB, React, react components, typescript, mobile, web, ui, ux, open source, components",
    siteUrl: pkg.homepage,
    description: pkg.description,
    title: siteName,
    sitePreviewImageUrl: imageUrl,
    jsonLD: {
        "@context": "http://schema.org",
        "@type": "WebApplication",
        name: siteName,
        description: pkg.description,
        url: pkg.homepage,
        image: imageUrl,
        screenshot: imageUrl,
        applicationCategory: "Software Documentation",
        operatingSystem: "Android, Chrome OS, iOS, iPadOS, macOS, OS X, Linux, Windows",
        author: {
            "@type": "Organization",
            name: "SEB",
            description: "SEB is a Swedish financial group for corporate customers, institutions and private individuals with headquarters in Stockholm",
            url: "https://seb.se",
            logo: "https://seb.se/Static/Images/SebLogo.svg",
        },
    },
};
