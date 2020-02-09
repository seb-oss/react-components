import * as React from "react";
import { RadioGroup, RadioListModel } from "../../../src/RadioGroup/RadioGroup";
import { Tabs } from "../../../src/Tabs/Tabs";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/RadioGroup/readme.md");

const RadioGroupPage: React.FunctionComponent = () => {
    const [radioListSelected, setRadioListSelected] = React.useState<string>("second");
    const [tabValue, setTabValue] = React.useState<number>(0);

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
                    <div className={"result" + (tabValue === 2 ? " wide" : "")}>
                        <Tabs
                            activeTab={tabValue}
                            onClick={(index: number) => setTabValue(index)}
                            list={[
                                { text: "Normal" },
                                { text: "Condensed" },
                                { text: "Inline" }
                            ]}
                        />
                        <RadioGroup
                            name="radioGroupName"
                            list={radioList}
                            value={radioListSelected}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRadioListSelected(e.target.value)}
                            condensed={tabValue === 1}
                            inline={tabValue === 2}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

const radioList: Array<RadioListModel> = [
    { value: "first", label: "Radio 1", },
    { value: "second", label: "Radio 2", description: "Some description" },
    { value: "third", label: "Radio 3", description: "Disabled", disabled: true },
];

export default RadioGroupPage;
