import * as React from "react";
import { RadioButton } from "../../../src/RadioButton/RadioButton";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/RadioButton/readme.md");

export default class RadioButtonPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);

        this.state = {
            radioListSelected: "second"
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
                        <p>Here are sample outputs, here is selected value: {this.state.radioListSelected}</p>
                        <div className="result">
                            <RadioButton
                                group="radioGroupName"
                                radioValue="first"
                                label="Single radio - first value"
                                value={this.state.radioListSelected}
                                onChange={(value) => { this.setState({ radioListSelected: value }); }}
                            />

                            <RadioButton
                                group="radioGroupName"
                                radioValue="second"
                                label="Single radio - second value"
                                value={this.state.radioListSelected}
                                onChange={(value) => { this.setState({ radioListSelected: value }); }}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
