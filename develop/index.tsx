import * as React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./components/App";
import "./favicon.ico";
import "./styles/main.scss";

// Use browserHistory if your are going to use URL without hash
render(
    <HashRouter>
        <App />
    </HashRouter>, document.getElementById("app") as HTMLElement
);
