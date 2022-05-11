module.exports = {
    setupFilesAfterEnv: ["<rootDir>/test/setupTests.js"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.js$": "babel-jest",
    },
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
        ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/file.mock.js",
    },
    testPathIgnorePatterns: ["node_modules", "\\.cache", "<rootDir>.*/public"],
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!(@sebgroup|react|raf)/)"],
    collectCoverage: true,
    coveragePathIgnorePatterns: ["node_modules", "index.ts", "^.+\\.mock", "^.+\\.polyfills"],
    testEnvironmentOptions: { resources: "usable" },
    globals: {
        __PATH_PREFIX__: "",
    },
    testURL: "http://localhost",
    testEnvironment: "jsdom",
};
