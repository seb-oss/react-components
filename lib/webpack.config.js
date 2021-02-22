const webpackCjs = require("./webpack/webpack.cjs");
const webpackEsm = require("./webpack/webpack.esm");

module.exports = [webpackCjs, webpackEsm];
