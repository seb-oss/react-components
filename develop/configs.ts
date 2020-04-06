// API CALL TYPE
const TYPE_LOCAL = "LOCAL";
const TYPE_REST = "REST";

// LANGUAGES
const LANG_EN = "en";
const LANG_DK = "dk";
const LANG_SW = "sw";

// resources
const SOCKET_URL = "http://localhost:4001";

// API contexts
// We will pass this to swagger class constractor if we need different base urls
const DEFAULT = "";
const SECONDARY = "/something";

// CONFIG DATA (Please change here only)
const configs = {
    delay: 500,
    toastDelay: 5000,
    socket: SOCKET_URL,
    type: TYPE_LOCAL,
    context: DEFAULT,
    lang: LANG_EN,
    activateSW: false,
    verNo: 0.1,
};

export default configs;
