type OSType = "Unknown OS" | "Windows OS" | "Macintosh" | "Linux OS" | "Android OS" | "iOS";
type BrowserType = "Opera" | "Firefox" | "Safari" | "Chrome" | "IE" | "Edge" | "Blink";
/**
 * Determines what is the current Operating system
 * @returns {OSType} The type of operating system
 *
 * `Unknown OS` | `Windows OS` | `Macintosh` | `Linux OS` | `Android OS` | `iOS`
 */
export function whichOS(): OSType {
    let type: OSType = "Unknown OS";
    if (navigator.userAgent.indexOf("Win") !== -1) {
        type = "Windows OS";
    } else if (navigator.userAgent.indexOf("Mac") !== -1) {
        type = "Macintosh";
    } else if (navigator.userAgent.indexOf("Linux") !== -1) {
        type = "Linux OS";
    } else if (navigator.userAgent.indexOf("Android") !== -1) {
        type = "Android OS";
    } else if (navigator.userAgent.indexOf("like Mac") !== -1) {
        type = "iOS";
    }
    return type;
}

/**
 * Determines what browser is currently being used
 * @returns {BrowserType} The type of the browser.
 *
 * `Opera` | `Firefox` | `Safari` | `Chrome` | `IE` | `Edge` | `Blink`
 */
export function whichBrowser(): BrowserType {
    // Opera 8.0+
    const isOpera: boolean = (!!window["opr"] && !!window["opr"].addons)
        || !!window["opera"]
        || navigator.userAgent.indexOf(" OPR/") !== -1;
    if (isOpera) { return "Opera"; }

    // Firefox 1.0+
    const isFirefox: boolean = typeof window["InstallTrigger"] !== "undefined";
    if (isFirefox) { return "Firefox"; }

    // Safari 3.0+ "[object HTMLElementConstructor]"
    const isSafari: boolean = /constructor/i.test(window["HTMLElement"].toString())
        || !!window["safari"]
        || (!!window["safari"] && window["safari"].pushNotification);
    if (isSafari) { return "Safari"; }

    // Internet Explorer 6-11
    const isIE: boolean = /*@cc_on!@*/false || !!document["documentMode"];
    if (isIE) { return "IE"; }

    // Edge 20+
    const isEdge: boolean = !isIE && !!window["StyleMedia"];
    if (isEdge) { return "Edge"; }

    // Chrome 1 - 75
    const isChrome: boolean = !!window["getChromeUILanguage"];
    if (isChrome) { return "Chrome"; }

    // Blink engine detection
    const isBlink: boolean = (isChrome || isOpera) && !!window["CSS"];
    if (isBlink) { return "Blink"; }
}
