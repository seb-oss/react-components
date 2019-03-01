import * as React from "react";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/CheckBox/readme.md");

export default class CheckBoxPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            checkbox1: true,
            checkbox2: false,
            checkbox3: true
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
                        <p>Here are few checkboxes with different configurations:</p>
                        <div className="result">
                            <CheckBox
                                name="checkbox-1"
                                label="Checkbox 1"
                                checked={this.state.checkbox1}
                                onChange={(event) => { this.setState({ checkbox1: event.target.checked }); }}
                            />
                            <CheckBox
                                name="checkbox-2"
                                label="Checkbox 2"
                                checked={this.state.checkbox2}
                                onChange={(event) => { this.setState({ checkbox2: event.target.checked }); }}
                                description="Some description"
                            />
                            <CheckBox
                                name="checkbox-3"
                                label="Checkbox 3"
                                checked={this.state.checkbox3}
                                onChange={(event) => { this.setState({ checkbox3: event.target.checked }); }}
                                disabled={true}
                                description="Disabled"
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
