import * as React from "react";
import { StepTracker } from "../../../src/StepTracker/StepTracker";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/StepTracker/readme.md");

const StepTrackerPage: React.FunctionComponent = () => {
    const [stepTracker, setStepTracker] = React.useState<number>(1);

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

                    <p>Here is an example of a horizontal step tracker:</p>
                    <div className="result wide">
                        <StepTracker
                            step={stepTracker}
                            list={stepList}
                            onClick={(index: number) => setStepTracker(index)}
                        />
                    </div>

                    <p>Here is an example of a vertical step tracker:</p>
                    <div className="result">
                        <StepTracker
                            step={stepTracker}
                            list={stepList}
                            orientation="vertical"
                            onClick={(index: number) => setStepTracker(index)}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

const stepList: Array<string> = ["Getting Started", "Personal Information", "Account Information", "Finish"];

export default StepTrackerPage;
