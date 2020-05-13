"use strict";
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
exports.__esModule = true;
var path_1 = require("path");
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var version = "v1.0.0";
var Indexer = /** @class */ (function () {
    function Indexer() {
        this.components = new Map();
        this.configs = { src: "", ignorePattern: [] };
        this.configs = this.getArgs();
        this.pathfinder = new RegExp("(?!.*(" + (this.configs.ignorePattern.join("|") || " ") + ").*)(^(" + this.configs.src.replace(/^[./]*/g, "") + "/).*(/index.[jt]s)$)", "g");
        this.configs.logProcess && console.log("\x1b[34m%s\x1b[0m", "2) Pathfinder Regex: ", this.pathfinder.source);
    }
    Indexer.prototype.findIndexes = function (startPath, filter) {
        if (!fs_1.existsSync(startPath)) {
            console.log("\x1b[31m%s\x1b[0m", "Error! Directory not found: " + startPath);
            process.exit(9);
        }
        var files = fs_1.readdirSync(startPath);
        for (var i = 0; i < files.length; i++) {
            var filename = path_1.join(startPath, files[i]).replace(/\\/g, "/");
            var stat = fs_1.lstatSync(filename);
            if (stat.isDirectory()) {
                this.findIndexes(filename, filter);
            } else if (filter.test(filename)) {
                this.insert(filename);
            }
        }
    };
    Indexer.prototype.insert = function (path) {
        var name = path.substring(path.search(/[a-zA-Z-_0-9]*\/index\.[tj]s$/), path.search(/\/index\.[tj]s$/));
        this.components.set(name, {
            path: "./" + path,
            indexTo: "." + path.replace(this.configs.src, "").replace(".ts", ".js"),
        });
    };
    Indexer.prototype.getArgs = function () {
        var args = require("minimist")(process.argv.slice(2));
        var foundArgs = {};
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
            console.table(__assign(__assign({}, foundArgs), { ignorePattern: foundArgs.ignorePattern.join("|") }));
        }
        return foundArgs;
    };
    Indexer.prototype.generate = function () {
        var _this = this;
        this.findIndexes(this.configs.src, this.pathfinder);
        if (this.configs.logProcess) {
            if (this.components.size) {
                var logList_1 = {};
                this.components.forEach(function (value, name) {
                    return (logList_1[name] = __assign({}, value));
                });
                console.log("\x1b[34m%s\x1b[0m", "3) Found the following files");
                console.table(logList_1);
            } else {
                console.log("3) No files found in the given directroy!");
            }
        }
        this.generated = { paths: {}, indexes: [] };
        if (this.components.size) {
            this.components.forEach(function (value, name) {
                _this.generated.paths[name] = value.path;
                _this.generated.indexes.push({
                    from: value.path,
                    to: value.indexTo,
                });
            });
            fs_1.writeFileSync(this.configs.output + "/index.json", "" + JSON.stringify(this.generated, null, 4));
            /** Stage the generated file */
            if (this.configs.stage) {
                child_process_1.exec("git add " + this.configs.output + "/index.json", function (error, stdout, stderr) {
                    if (error) {
                        console.log("error: " + error.message);
                        return;
                    }
                    console.log(stdout);
                });
            }
            console.log("\x1b[32m%s\x1b[0m", "Indexes file is generated successfully");
        } else {
            console.log("\x1b[31m%s\x1b[0m", "Error! No index files found in this directory");
            process.exit(9);
        }
        return this;
    };
    return Indexer;
})();
new Indexer().generate();
