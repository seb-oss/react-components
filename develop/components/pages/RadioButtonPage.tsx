import * as React from "react";
import { RadioButton } from "../../../src/RadioButton/RadioButton";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/RadioButton/readme.md");

const RadioButtonPage: React.FunctionComponent = () => {
    const [radioListSelected, setRadioListSelected] = React.useState("");

    return (
        <div className="route-template">
            <div className="info-holder">

                <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div>

                <div className="info">
                    <h2>Output</h2>
                    <p>Here are sample outputs, here is selected value: {radioListSelected}</p>
                    <div className="result">
                        <RadioButton
                            name="example"
                            radioValue="first"
                            label="Single radio - first value"
                            value={radioListSelected}
                            onChange={(value: string) => setRadioListSelected(value)}
                        />

                        <RadioButton
                            name="example"
                            radioValue="second"
                            label="Single radio - second value"
                            value={radioListSelected}
                            onChange={(value: string) => setRadioListSelected(value)}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default RadioButtonPage;
