import * as React from "react";
import { RadioButton } from "../../../src/RadioButton/RadioButton";
import { Tabs } from "../../../src/Tabs/Tabs";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/RadioButton/readme.md");

const RadioButtonPage: React.FunctionComponent = () => {
    const [radioListSelected, setRadioListSelected] = React.useState<string>("third");
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
                        <RadioButton
                            name="example"
                            radioValue="first"
                            label="First"
                            value={radioListSelected}
                            onChange={(value: string) => setRadioListSelected(value)}
                            condensed={tabValue === 1}
                            inline={tabValue === 2}
                        />

                        <RadioButton
                            name="example"
                            radioValue="second"
                            label="Second"
                            value={radioListSelected}
                            onChange={(value: string) => setRadioListSelected(value)}
                            condensed={tabValue === 1}
                            inline={tabValue === 2}
                            description="Some description"
                        />

                        <RadioButton
                            name="example"
                            radioValue="third"
                            label="Third"
                            value={radioListSelected}
                            onChange={(value: string) => setRadioListSelected(value)}
                            disabled={true}
                            condensed={tabValue === 1}
                            inline={tabValue === 2}
                            description="Disabled"
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default RadioButtonPage;
