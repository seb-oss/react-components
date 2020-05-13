import React from "react";
import { render } from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./components/App";
import "./favicon.ico";
import "./styles/main.scss";

// Use browserHistory if your are going to use URL without hash
render(
    <Router>
        <App />
    </Router>,
    document.getElementById("app")
);
