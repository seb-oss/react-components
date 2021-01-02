module.exports = {
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    transform: {
        "^.+\\.[jt]sx?$": "ts-jest",
    },
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
        ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    },
    testPathIgnorePatterns: ["node_modules", "\\.cache", "<rootDir>.*/public"],
    transformIgnorePatterns: ["node_modules/(?!(gatsby|@sebgroup|react)/)"],
    collectCoverage: true,
    coveragePathIgnorePatterns: ["node_modules", "index.ts", ".mock.ts"],
    testEnvironmentOptions: { resources: "usable" },
    globals: {
        __PATH_PREFIX__: "",
    },
    testURL: "http://localhost",
    setupFiles: ["<rootDir>/loadershim.js"],
};
