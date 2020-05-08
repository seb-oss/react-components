const path = require("path");
const fs = require("fs");

/**
 * Configurations
 * @param {string} src The source folder to look inside
 * @param {string[]} ignorePatter An array of folders or files to ignore
 * @param {boolean} includeRoot When the root of the source folder should be included in searching for indexes
 */
const config = {
    src: "src",
    ignorePattern: ["__utils"],
};

const regex = new RegExp(`(?!.*(${config.ignorePattern.join("|") || " "}).*)(^(${config.src.replace(/^[./]*/g, "")}\/).*(\/index\.[jt]s)$)`, "g");

function findIndexes(startPath, filter, callback) {
    if (!fs.existsSync(startPath)) {
        console.log("\x1b[31m", `Error! Directory not found: ${startPath}`);
        return;
    }

    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]).replace(/\\/g, "/");
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            findIndexes(filename, filter, callback);
        } else if (filter.test(filename)) {
            callback(filename);
        }
    }
}

class Components {
    constructor() {
        this.paths = {};
        this.indexes = [];
    }
    insert(path) {
        const name = path.substring(path.search(/[a-zA-Z-_0-9]*\/index\.[tj]s$/), path.search(/\/index\.[tj]s$/));
        this.paths[name] = "./" + path;
        this.indexes.push({
            from: `./${path}`,
            to: `.${path.replace(config.src, "").replace(".ts", ".js")}`,
        });
    }
    generate() {
        return [this.paths, this.indexes.sort((a, b) => a.from < b.from)];
    }
}

const components = new Components();
findIndexes(config.src, regex, function (filename) {
    components.insert(filename);
});

if (components) {
    console.table(components.paths);
    console.table(components.indexes);
} else {
    console.log("\x1b[31m", `Error! No index files found in this directory`);
}
