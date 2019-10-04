import * as React from "react";
import { InlineLink } from "../../../src/InlineLink/InlineLink";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/InlineLink/readme.md");

const InlineLinkPage: React.FunctionComponent = () => {
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
                    <p>Here is a sample output</p>
                    <div className="result wide">
                        <div><InlineLink onClick={() => alert("Redirect or do some other action")}>Lorem ipsum</InlineLink> dolor sit amet, consectetur adipiscing elit.</div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default InlineLinkPage;
