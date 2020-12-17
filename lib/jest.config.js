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
const specific = argv.slice(2, argv.length).filter((arg) => !arg.startsWith("--"));

function extractSpecifics(injectTo) {
    return specific.map((item) => injectTo.replace("%inject%", item));
}

const collectCoverageFrom = [];
const testMatch = [];

if (specific.length) {
    collectCoverageFrom.push(...extractSpecifics("src/**/%inject%.(ts|tsx|js|jsx)"));
    testMatch.push(...extractSpecifics("**/%inject%.test.(ts|tsx|js|jsx)"));
} else {
    collectCoverageFrom.push("src/**/*.(ts|tsx|js|jsx)");
    testMatch.push("**/*.test.(ts|tsx|js|jsx)");
}

collectCoverageFrom.push("!src/**/index.(ts|js)");

module.exports = {
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    transform: {
        "^.+\\.[jt]sx?$": `<rootDir>/jest-preprocess.js`,
    },
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
        ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
    },
    testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
    transformIgnorePatterns: [`node_modules/(?!(gatsby|@sebgroup|react)/)`],
    collectCoverage: true,
    collectCoverageFrom,
    testMatch,
    globals: {
        __PATH_PREFIX__: ``,
    },
    testURL: `http://localhost`,
    setupFiles: [`<rootDir>/loadershim.js`],
};
