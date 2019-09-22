import * as React from "react";
import { RadioGroup, RadioListModel } from "../../../src/RadioGroup/RadioGroup";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/RadioGroup/readme.md");

const RadioGroupPage: React.FunctionComponent = () => {
    const [radioListSelected, setRadioListSelected] = React.useState<string>("second");

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
                    <p>Here are sample outputs, here is selected value: {radioListSelected}</p>
                    <div className="result">
                        <RadioGroup
                            name="radioGroupName"
                            list={radioList}
                            value={radioListSelected}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadioListSelected(e.target.value)}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

const radioList: Array<RadioListModel> = [
    { value: "first", group: "my-group", label: "Radio 1", },
    { value: "second", group: "my-group", label: "Radio 2", description: "Some description" },
    { value: "third", group: "my-group", label: "Radio 3", description: "Disabled", disabled: true },
];

export default RadioGroupPage;
