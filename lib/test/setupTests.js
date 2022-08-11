import "@testing-library/jest-dom";
import "jest-date-mock";
import "raf/polyfill";
import "./canvas.mock";
import "./image.mock";
import "./mutationObserver.mock";

function addListenerFun() {
    return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
        media: "",
    };
}

const value = navigator.userAgent || "Chrome";
Object.defineProperty(window.navigator, "userAgent", { value, configurable: true, writable: true });

window.HTMLElement.prototype.scrollIntoView = function () {};
window.PointerEvent = MouseEvent; // mock PointerEvent
window.matchMedia = window.matchMedia || addListenerFun;
