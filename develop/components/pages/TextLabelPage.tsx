import * as React from "react";
import { TextLabel } from "../../../src/TextLabel/TextLabel";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/TextLabel/readme.md");

export default class TextLabelPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            textBoxValue: ""
        };
    }

    render() {
        const mode = getParameterByName(this.props.location.search, "mode");
        return (
            <div className={"route-template " + ((mode === "dl" || mode === "DL") ? "brief" : "")}>
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
    }
}
