import * as React from "react";
import { TextBox } from "../../../src/TextBox/TextBox";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/TextBox/readme.md");

const TextBoxPage: React.FunctionComponent = () => {
    const [textBoxValue, setTextBoxValue] = React.useState<string>("");
    const [textBoxValue2, setTextBoxValue2] = React.useState<string>("Not good");
    const [textBoxValue3, setTextBoxValue3] = React.useState<string>("All good");

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
                    <p>Here is the basic bootstrap one:</p>
                    <div className="result">
                        <TextBox
                            name="textInput"
                            label="Textbox label"
                            placeholder="Text Box PlaceHolder"
                            value={textBoxValue}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextBoxValue(e.target.value)}
                        />
                    </div>

                    <p>Here is the input with error:</p>
                    <div className="result">
                        <TextBox
                            name="textInput2"
                            placeholder="Text Box PlaceHolder"
                            error="error msg will be shown here"
                            value={textBoxValue2}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextBoxValue2(e.target.value)}
                        />
                    </div>

                    <p>Here is the input with success:</p>
                    <div className="result">
                        <TextBox
                            name="textInput3"
                            placeholder="Text Box PlaceHolder"
                            value={textBoxValue3}
                            success
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextBoxValue3(e.target.value)}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default TextBoxPage;
