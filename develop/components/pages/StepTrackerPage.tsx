import * as React from "react";
import { StepTracker } from "../../../src/StepTracker/StepTracker";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/StepTracker/readme.md");

interface StepTrackerPageState {
    stepTracker: number;
    stepList: Array<string>;
}

export default class StepTrackerPage extends React.Component<any, StepTrackerPageState>  {
    constructor(props: any) {
        super(props);

        this.state = {
            stepTracker: 1,
            stepList: ["Getting Started", "Personal Information", "Account Information", "Finish"]
        };

        this.clickAction = this.clickAction.bind(this);
    }

    clickAction(index): void {
        this.setState({ stepTracker: index });
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

                        <p>Here is an example of a horizontal step tracker:</p>
                        <div className="result wide">
                            <StepTracker
                                step={this.state.stepTracker}
                                list={this.state.stepList}
                                onClick={this.clickAction}
                            />
                        </div>

                        <p>Here is an example of a vertical step tracker:</p>
                        <div className="result">
                            <StepTracker
                                step={this.state.stepTracker}
                                list={this.state.stepList}
                                orientation="vertical"
                                onClick={this.clickAction}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
