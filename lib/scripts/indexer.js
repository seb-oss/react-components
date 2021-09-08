const path = require("path");
const fs = require("fs");

const source = path.resolve(__dirname, "../src");

const components = fs.readdirSync(source).filter((name) => fs.lstatSync(path.resolve(source, name)).isDirectory() && !name.startsWith("__"));

const paths = {};
components.forEach((name) => {
    paths[name] = `./src/${name}/index.ts`;
});
const indexes = components.map((name) => `./src/${name}/index.ts`);

fs.writeFileSync(path.resolve(source, "index.json"), JSON.stringify({ paths, indexes }, null, 4));
