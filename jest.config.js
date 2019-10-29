
/**
 * Read the variable `comp` passed with npm command.
 * @example
 * To test only the App component you
 * would run the following command
 * `npm test App`
 * Multiple components can be tested using
 * `npm test Button RadioGroup`
 */
const { argv } = process;
const specific = argv.slice(4, argv.length); // Skipping test properties

const collectCoverageFrom = [];
const testMatch = [];

if (specific.length) {
    collectCoverageFrom.push(...extractSpecifics("src/**/%inject%.(ts|tsx|js|jsx)"));
    testMatch.push(...extractSpecifics("**/%inject%.test.(ts|tsx|js|jsx)"))
} else {
    collectCoverageFrom.push("src/**/*.(ts|tsx|js|jsx)");
    testMatch.push("**/*.test.(ts|tsx|js|jsx)");
}

collectCoverageFrom.push("!src/**/index.(ts|js)");

function extractSpecifics(injectTo) {
    return specific.map((item) => injectTo.replace("%inject%", item))
}

module.exports = {
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    testEnvironment: "jsdom",
    testMatch,
    modulePaths: [
        "<rootDir>/src",
        "<rootDir>/node_modules"
    ],
    globals: {
        "NODE_ENV": "test"
    },
    verbose: true,
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
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
    collectCoverageFrom,
    coverageDirectory: "./coverage",
    coverageReporters: ["json", "lcov", "text"]
};