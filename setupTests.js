require("raf/polyfill");
require("jsdom-global/register");
require("./__mocks__/mutationObserverMock");
require("./__mocks__/canvasMock");
const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-16");
// at the top of file , even  , before importing react

// Setup enzyme"s react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

function doNothing() {
    // nothing
}

function addListenerFun() {
    return {
        matches: false,
        addListener: () => { doNothing(); },
        removeListener: () => { doNothing(); },
        media: ""
    };
}

window.matchMedia = window.matchMedia || addListenerFun;
