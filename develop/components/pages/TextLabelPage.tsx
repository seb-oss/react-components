import React from "react";
import { TextLabel } from "../../../src/TextLabel";
import { Tooltip } from "../../../src/Tooltip";
import Highlight from "react-highlight";
import docMD from "../../../src/TextLabel/readme.md";

const TextLabelPage: React.FC = () => {
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
                    <p>Here is the basic bootstrap one:</p>
                    <div className="result">
                        <TextLabel value="400,000 kr" label="Current savings" />
                    </div>

                    <p>An example with passing ReactNode as the value (tooltip):</p>
                    <div className="result">
                        <TextLabel
                            value={
                                <>
                                    400,000 kr
                                    <Tooltip className="ml-1" position="top-right" />
                                </>
                            }
                            label="Current savings"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextLabelPage;
