const fs = require("fs");
const path = require("path");
const pkg = require("../../package.json");

const dist = path.resolve(__dirname, "../dist");
const root = path.resolve(__dirname, "../../");

const neededParams = ["name", "version", "description", "main", "typings", "repository", "keywords", "author", "license", "bugs", "dependencies", "module", "exports"];

Object.keys(pkg).forEach((param) => {
    if (param === "dependencies") {
        pkg["peerDependencies"] = pkg[param];
        delete pkg[param];
    }
    if (!neededParams.includes(param)) {
        delete pkg[param];
    } else {
        if (!pkg[param] || (typeof pkg[param] === "object" && !Object.keys(pkg[param]).length)) {
            delete pkg[param];
        }
    }
});

fs.writeFileSync(path.resolve(dist, "package.json"), JSON.stringify(pkg, null, 4));
console.info("✅ Created package.json in dist folder");

fs.copyFileSync(path.resolve(root, "README.md"), path.resolve(dist, "README.md"));
console.info("✅ Copied over README.md to dist");

fs.copyFileSync(path.resolve(root, "LICENSE"), path.resolve(dist, "LICENSE"));
console.info("✅ Copied over LICENSE to dist");
