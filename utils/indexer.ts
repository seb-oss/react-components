import { join } from "path";
import { existsSync, readdirSync, Stats, lstatSync, writeFileSync } from "fs";
import { exec } from "child_process";

const version: string = "v1.0.0";

interface IndexerGeneratedIndex {
    paths?: { [component: string]: string };
    indexes?: Array<{ from: string; to: string }>;
}

interface IndexerArguments {
    /** The source directory to look for indexes */
    entry?: string;
    /** The source directory to look for indexes */
    e?: string;
    /** Utility version */
    version?: string;
    /** Utility version */
    v?: string;
    /** Output directory */
    output?: string;
    /** Output directory */
    o?: string;
    /** Ignore pattern passed as string with pipes in between. Example: `first|second|third` */
    "ignore-pattern"?: string;
    /** Ignore pattern passed as string with pipes in between. Example: `first|second|third` */
    i?: string;
    /** Logs the generated indexes if successful */
    log?: boolean;
    /** Logs the generated indexes if successful */
    l?: boolean;
    /** Stage the generated file */
    stage?: boolean;
    /** Stage the generated file */
    s?: boolean;
}

interface IndexerConfig {
    /** The source folder to look inside */
    src?: string;
    /** The output directory. Default is same as source */
    output?: string;
    /** An array of folders or files to ignore */
    ignorePattern?: Array<string>;
    /** Logs the generated indexes if successful */
    logProcess?: boolean;
    /** Stage the generated file */
    stage?: boolean;
}

interface IndexedComponent {
    path: string;
    indexTo: string;
}

class Indexer {
    private pathfinder: RegExp;
    private components: Map<string, IndexedComponent> = new Map<string, IndexedComponent>();
    private configs: IndexerConfig = { src: "", ignorePattern: [] };
    public generated: IndexerGeneratedIndex;

    constructor() {
        this.configs = this.getArgs();
        this.pathfinder = new RegExp(`(?!.*(${this.configs.ignorePattern.join("|") || " "}).*)(^(${this.configs.src.replace(/^[./]*/g, "")}\/).*(\/index\.[jt]s)$)`, "g");
        this.configs.logProcess && console.log("\x1b[34m%s\x1b[0m", "2) Pathfinder Regex: ", this.pathfinder.source);
    }

    private findIndexes(startPath: string, filter: RegExp): void {
        if (!existsSync(startPath)) {
            console.log("\x1b[31m%s\x1b[0m", `Error! Directory not found: ${startPath}`);
            process.exit(9);
        }

        const files: Array<string> = readdirSync(startPath);
        for (let i: number = 0; i < files.length; i++) {
            const filename: string = join(startPath, files[i]).replace(/\\/g, "/");
            const stat: Stats = lstatSync(filename);
            if (stat.isDirectory()) {
                this.findIndexes(filename, filter);
            } else if (filter.test(filename)) {
                this.insert(filename);
            }
        }
    }

    private insert(path: string): void {
        const name: string = path.substring(path.search(/[a-zA-Z-_0-9]*\/index\.[tj]s$/), path.search(/\/index\.[tj]s$/));
        this.components.set(name, {
            path: `./${path}`,
            indexTo: `.${path.replace(this.configs.src, "").replace(".ts", ".js")}`,
        });
    }

    private getArgs(): IndexerConfig {
        const args: IndexerArguments = require("minimist")(process.argv.slice(2));
        const foundArgs: IndexerConfig = {};

        if (args.v || args.version) {
            console.log(version);
            process.exit(0);
        } else {
            foundArgs.src = args.e || args.entry || "";
            foundArgs.ignorePattern = (args.i ? args.i : args["ignore-pattern"] || "").split("|");
            foundArgs.output = args.o || args.output || foundArgs.src;
            foundArgs.logProcess = args.l !== undefined ? !!args.l : !!args.log;
            foundArgs.stage = args.s !== undefined ? !!args.s : !!args.entry;
        }
        if (foundArgs.logProcess) {
            console.log("\x1b[34m%s\x1b[0m", "1) Scanning for process arguments...");
            console.table({ ...foundArgs, ignorePattern: foundArgs.ignorePattern.join("|") });
        }
        return foundArgs;
    }

    public generate(): Indexer {
        this.findIndexes(this.configs.src, this.pathfinder);
        if (this.configs.logProcess) {
            if (this.components.size) {
                const logList: { [name: string]: IndexedComponent } = {};
                this.components.forEach((value: IndexedComponent, name: string) => (logList[name] = { ...value }));
                console.log("\x1b[34m%s\x1b[0m", "3) Found the following files");
                console.table(logList);
            } else {
                console.log("3) No files found in the given directroy!");
            }
        }
        this.generated = { paths: {}, indexes: [] };
        if (this.components.size) {
            this.components.forEach((value: IndexedComponent, name: string) => {
                this.generated.paths[name] = value.path;
                this.generated.indexes.push({
                    from: value.path,
                    to: value.indexTo,
                });
            });
            writeFileSync(this.configs.output + "/index.json", `${JSON.stringify(this.generated, null, 4)}`);
            /** Stage the generated file */
            if (this.configs.stage) {
                exec(`git add ${this.configs.output}/index.json`, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    console.log(stdout);
                });
            }
            console.log("\x1b[32m%s\x1b[0m", "Indexes file is generated successfully");
        } else {
            console.log("\x1b[31m%s\x1b[0m", `Error! No index files found in this directory`);
            process.exit(9);
        }
        return this;
    }
}

new Indexer().generate();
