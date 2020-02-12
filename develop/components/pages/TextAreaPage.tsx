import * as React from "react";
import { TextArea } from "../../../src/TextArea/TextArea";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/TextArea/readme.md");

const TextAreaPage: React.FunctionComponent = () => {
    const [textBoxValue, setTextBoxValue] = React.useState<string>("");
    const [textBox2Value, setTextBox2Value] = React.useState<string>("");

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
                        <TextArea
                            name="textArea"
                            label="Textarea label"
                            placeholder="Text Area PlaceHolder"
                            value={textBoxValue}
                            cols={30}
                            rows={5}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextBoxValue(e.target.value)}
                        />
                    </div>

                    <p>Here is the input with error:</p>
                    <div className="result">
                        <TextArea
                            name="textInput"
                            placeholder="Text Area PlaceHolder"
                            error="error msg will be shown here"
                            cols={30}
                            rows={5}
                            value={textBox2Value}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextBox2Value(e.target.value)}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default TextAreaPage;
