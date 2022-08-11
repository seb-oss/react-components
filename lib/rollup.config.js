import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import styles from "rollup-plugin-styles";
import pkg from "./package.json";
import commonPkg from "../package.json";

const components = require("./src/index.json");

function injectCSS(css, uniqueId, isPrepend) {
    if (!css || !document) {
        return;
    }
    
    const exists = !!document.querySelector(`style[id="${uniqueId}"]`)
    if (exists) {
        return;
    }

    const cssElement = document.createElement("style");
    cssElement.id = uniqueId;
    cssElement.setAttribute("type", "text/css");

    cssElement.innerHTML = css;
    if (isPrepend && document.head.firstChild) {
        document.head.insertBefore(cssElement, document.head.firstChild);
    } else {
        document.head.appendChild(cssElement);
    }
    return cssElement;
}

const globals = {
    react: "React",
    "react-dom": "ReactDOM",
};

const defaults = {
    input: ["./src/index.ts", ...components.indexes],
    external: [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {}), ...Object.keys(commonPkg.dependencies || {})],
};

const resolveOnly = [new RegExp(`^((?!${defaults.external.map((item) => `(${item})`).join("|")}).)*$`, "g")];

export default [
    {
        ...defaults,
        plugins: [
            typescript(),
            styles({
                minimize: true,
                mode: [
                    "inject",
                    (varname, id) => {
                        const filePathArray = id.split("\\");
                        const file = filePathArray[filePathArray.length - 1].split(".");
                        return `${varname} = injectCSS(${varname}, "rc-${file[0]}");`;
                    },
                ],
            }),
            resolve({ resolveOnly }),
            commonjs(),
        ],
        output: {
            dir: "dist",
            format: "cjs",
            entryFileNames: "[name].js",
            sourcemap: true,
            esModule: true,
            exports: "named",
            preserveModules: true,
            globals,
        },
    },
    {
        ...defaults,
        plugins: [
            styles({
                minimize: true,
                mode: [
                    "inject",
                    (varname, id) => {
                        const filePathArray = id.split("\\");
                        const file = filePathArray[filePathArray.length - 1].split(".");
                        return `${varname} = injectCSS(${varname}, "rc-${file[0]}");`;
                    },
                ],
            }),
            typescript({ compilerOptions: { declarationDir: "dist/esm", outDir: "dist/esm" } }),
            resolve({ resolveOnly }),
            commonjs(),
        ],
        output: {
            dir: "dist/esm",
            format: "esm",
            entryFileNames: "[name].js",
            sourcemap: true,
            esModule: true,
            exports: "named",
            preserveModules: true,
            globals,
        },
    },
];
