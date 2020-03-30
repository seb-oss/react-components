(window as any).global = window;
/**
 * buffer was removed from node recent version and moved into a seperate dependency.
 * The line below simply checks when one exist use it, otherwise use the new dependency.
 */
// @ts-ignore
window.Buffer = window.Buffer || require("buffer").Buffer;

export * from "./Table";
export * from "./CustomRowTemplate";
