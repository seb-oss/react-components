import React from "react";
import { Collapse } from "../../../src/Collapse";
import Highlight from "react-highlight";
import { Button } from "../../../src/Button";
import { loremIpsum } from "lorem-ipsum";
import docMD from "../../../src/Collapse/readme.md";

const text: string = loremIpsum({ units: "paragraph" });

const CollapsePage: React.FC = () => {
    const [toggle, setToggle] = React.useState<boolean>(true);
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
                    <div className="result wide">
                        <Button className="mb-3" onClick={() => setToggle(!toggle)}>
                            Toggle collapse
                        </Button>
                        <Collapse toggle={toggle}>
                            <p className="border border-danger p-3">{text}</p>
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollapsePage;
