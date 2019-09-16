import * as React from "react";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/CheckBox/readme.md");

const CheckBoxPage: React.FunctionComponent = () => {
    const [checkbox1, setCheckbox1] = React.useState(true);
    const [checkbox2, setCheckbox2] = React.useState(false);
    const [checkbox3, setCheckbox3] = React.useState(true);

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
                    <p>Here are few checkboxes with different configurations:</p>
                    <div className="result">
                        <CheckBox
                            name="checkbox1"
                            label="Checkbox 1"
                            checked={checkbox1}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckbox1(e.target.checked)}
                        />
                        <CheckBox
                            name="checkbox2"
                            label="Checkbox 2"
                            checked={checkbox2}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckbox2(e.target.checked)}
                            description="Some description"
                        />
                        <CheckBox
                            name="checkbox3"
                            label="Checkbox 3"
                            checked={checkbox3}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckbox3(e.target.checked)}
                            disabled={true}
                            description="Disabled"
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default CheckBoxPage;
