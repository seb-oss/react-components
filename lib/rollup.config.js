import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import styles from "rollup-plugin-styles";
import pkg from "./package.json";
import commonPkg from "../package.json";

const components = require("./src/index.json");
const globals = {
    react: "React",
    "react-dom": "ReactDOM",
};

const defaults = {
    input: ["./src/index.ts", ...components.indexes],
    external: [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {}), ...Object.keys(commonPkg.dependencies || {})],
};

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
                        return `const inject = require("css-style-inject");\n${varname} = inject.injectCSS(${varname}, "rc-${file[0]}");`;
                    },
                ],
            }),
            resolve({
                resolveOnly: [new RegExp(`^((?!${defaults.external.map((item) => `(${item})`).join("|")}).)*$`, "g")],
            }),
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
    // {
    //     ...defaults,
    //     plugins: [
    //         styles({
    //             minimize: true,
    //             mode: [
    //                 "inject",
    //                 (varname, id) => {
    //                     const filePathArray = id.split("\\");
    //                     const file = filePathArray[filePathArray.length - 1].split(".");
    //                     return `const inject = require("css-style-inject");\n${varname} = inject.injectCSS(${varname}, "rc-${file[0]}");`;
    //                 },
    //             ],
    //         }),
    //         typescript({ compilerOptions: { declarationDir: "dist/esm", outDir: "dist/esm" } }),
    //         resolve(),
    //         commonjs(),
    //     ],
    //     output: {
    //         dir: "dist/esm",
    //         format: "esm",
    //         entryFileNames: "[name].js",
    //         sourcemap: true,
    //         esModule: true,
    //         exports: "named",
    //         preserveModules: true,
    //         globals,
    //     },
    // },
];
