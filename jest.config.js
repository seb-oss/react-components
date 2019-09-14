
/**
 * Read the variable `comp` passed with npm command.
 * @example
 * To test only the App component you
 * would run the following command
 * ```npm test --comp=App```
 */
const specific = process.env.npm_config_comp;

module.exports = {
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    testEnvironment: "jsdom",
    testMatch: [
        `**/${specific || "*"}.test.(ts|tsx|js|jsx)`,
        `**/?(${specific || "*"}.)+(spec|test).(ts|tsx|js|jsx)`
    ],
    modulePaths: [
        "<rootDir>/src",
        "<rootDir>/node_modules"
    ],
    globals: {
        "NODE_ENV": "test"
    },
    verbose: true,
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    transformIgnorePatterns: ["/node_modules/(?!(lodash-es|react)/)"], // <-- this allows babel to load only the node modules I need (which is lodash-es) and ignore the rest
    testEnvironment: "node",
    moduleNameMapper: {
        "aurelia-(.*)": "<rootDir>/node_modules/$1",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
    },
    // some coverage and results processing options
    collectCoverage: true,
    collectCoverageFrom: [
        `src/**/${specific || "*"}.(ts|tsx|js|jsx)`,
        "!src/**/index.(ts|js)"
    ],
    coverageDirectory: "./coverage",
    coverageReporters: ["json", "lcov", "text"]
};