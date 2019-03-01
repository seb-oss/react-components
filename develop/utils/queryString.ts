export function getParameterByName(queryString: string, name: string) {
    const match = RegExp("[?&]" + name + "=([^&]*)").exec(queryString);
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}
