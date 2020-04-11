import * as React from "react";
import { Stepper } from "../../../src/Stepper/Stepper";
import Highlight from "react-highlight";
const docMD = require("../../../src/Stepper/readme.md");

const StepperPage: React.FunctionComponent = () => {
    const [stepper, setStepper] = React.useState<number>(1);

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
                    <p>Here are sample outputs</p>
                    <div className="result">
                        <Stepper value={stepper} min={0} max={10} label="Stepper label" onIncrease={() => setStepper(stepper + 1)} onDecrease={() => setStepper(stepper - 1)} />
                    </div>
                    <div className="result">
                        <Stepper value={stepper} min={0} max={10} label="Disabled Stepper" onIncrease={() => setStepper(stepper + 1)} onDecrease={() => setStepper(stepper - 1)} disabled={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepperPage;
