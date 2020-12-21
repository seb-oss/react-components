require("raf/polyfill");
require("./__mocks__/mutationObserverMock");
require("./__mocks__/canvasMock");
const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-16");

// Setup enzyme"s react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

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

Object.defineProperty(window.navigator, "userAgent", { value: "Chrome", configurable: true, writable: true });

window.matchMedia = window.matchMedia || addListenerFun;
