
(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || require("buffer").Buffer;

export * from "./Table";
