import * as React from "react";
import { Loader } from "../../../src/Loader/Loader";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Loader/readme.md");

const LoaderPage: React.FunctionComponent = () => {
    return (
        <div className="route-template container">
            <div className="info-holder">

                <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div>

                <div className="info">
                    <h2>Output</h2>
                    <p>Here are sample outputs</p>
                    <div className="result">
                        <Loader toggle={true} fullscreen={false} />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default LoaderPage;
