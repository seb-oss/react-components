import * as React from "react";
import { TextBox } from "../../../src/TextBox/TextBox";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/TextBox/readme.md");

export default class TextBoxPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            textBoxValue: "",
            textBoxValue2: ""
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
                        <div className="result">
                            <TextBox
                                name="textInput"
                                label="Textbox label"
                                placeHolder="Text Box PlaceHolder"
                                value={this.state.textBoxValue}
                                onChange={(event) => { this.setState({ textBoxValue: event.target.value }); }}
                            />
                        </div>

                        <p>Here is the input with error:</p>
                        <div className="result">
                            <TextBox
                                name="textInput2"
                                placeHolder="Text Box PlaceHolder"
                                error="error msg will be shown here"
                                value={this.state.textBoxValue2}
                                onChange={(event) => { this.setState({ textBoxValue2: event.target.value }); }}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
