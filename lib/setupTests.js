require("raf/polyfill");
require("./__mocks__/mutationObserverMock");
require("./__mocks__/canvasMock");

function doNothing() {
    // nothing
}

function addListenerFun() {
    return {
        matches: false,
        addListener: () => {
            doNothing();
        },
        removeListener: () => {
            doNothing();
        },
        media: "",
    };
}

const value = navigator.userAgent || "Chrome";
Object.defineProperty(window.navigator, "userAgent", { value, configurable: true, writable: true });

window.matchMedia = window.matchMedia || addListenerFun;
