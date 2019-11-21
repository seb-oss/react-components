import * as React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./components/App";
import "./favicon.ico";
import "./styles/main.scss";
import { Docs } from "./components/Docs";

// Use browserHistory if your are going to use URL without hash
render(
    <HashRouter>
        <Docs />
    </HashRouter>, document.getElementById("app") as HTMLElement
);
