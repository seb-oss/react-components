/**
 * Find the value of an item in the query string
 * @param queryString The query string
 * @param name The name of the query item needs to be retrieved
 * @returns The value of the query item found in the query string
 */
export function getParameterByName(queryString: string, name: string): string {
    const match: RegExpExecArray = RegExp("[?&]" + name + "=([^&]*)").exec(queryString);
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}
