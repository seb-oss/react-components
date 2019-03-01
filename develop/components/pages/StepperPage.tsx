import * as React from "react";
import { Stepper } from "../../../src/Stepper/Stepper";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Stepper/readme.md");

export default class StepperPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);

        this.state = {
            stepperValue: 1
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
                        <p>Here are sample outputs</p>
                        <div className="result">
                            <Stepper
                                value={this.state.stepperValue}
                                min={0}
                                max={10}
                                label="Stepper label"
                                onIncrease={() => { this.setState({ stepperValue: this.state.stepperValue + 1 }); }}
                                onDecrease={() => { this.setState({ stepperValue: this.state.stepperValue - 1 }); }}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
