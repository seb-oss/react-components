import * as React from "react";
import { RadioGroup } from "../../../src/RadioGroup/RadioGroup";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/RadioGroup/readme.md");

export default class RadioGroupPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);

        this.state = {
            radioList: [
                { value: "first", group: "my-group", label: "Radio 1", },
                { value: "second", group: "my-group", label: "Radio 2", description: "Some description" },
                { value: "third", group: "my-group", label: "Radio 3", description: "Disabled", disabled: true },
            ],
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
                            <RadioGroup
                                name="radioGroupName"
                                list={this.state.radioList}
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
