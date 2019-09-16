import * as React from "react";
import { TextLabel } from "../../../src/TextLabel/TextLabel";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/TextLabel/readme.md");

const TextLabelPage: React.FunctionComponent = () => {
    return (
        <div className="route-template">
            <div className="info-holder">

                <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div>

                <div className="info">
                    <h2>Output</h2>
                    <p>Here is the basic bootstrap one:</p>
                    <div className="result wide">
                        <div className="row no-gutters">
                            <TextLabel
                                className="col-2"
                                name="textname"
                                value="400,000 kr"
                                label="Current savings"
                            />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default TextLabelPage;
