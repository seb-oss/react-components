import * as React from "react";
import { TextArea } from "../../../src/TextArea/TextArea";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/TextArea/readme.md");

export default class TextAreaPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            textBoxValue: "",
            textBox2Value: ""
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
                            <TextArea
                                name="textArea"
                                label="Textarea label"
                                placeHolder="Text Area PlaceHolder"
                                value={this.state.textBoxValue}
                                cols={30}
                                rows={5}
                                onChange={(event) => { this.setState({ textBoxValue: event.target.value }); }}
                            />
                        </div>

                        <p>Here is the input with error:</p>
                        <div className="result">
                            <TextArea
                                name="textInput"
                                placeHolder="Text Area PlaceHolder"
                                error="error msg will be shown here"
                                cols={30}
                                rows={5}
                                value={this.state.textBox2Value}
                                onChange={(event) => { this.setState({ textBox2Value: event.target.value }); }}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
