import * as React from "react";
import { TextBoxGroup } from "../../../src/TextBoxGroup/TextBoxGroup";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/TextBoxGroup/readme.md");

const moneyIcon: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170">
        <title>regular_black</title>
        <path d="M137.5,102.1V40.4a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v61.7a3,3,0,0,0,3,3H134.5A3,3,0,0,0,137.5,102.1ZM112,91.3v7.7H30.5V91.3a3,3,0,0,0-3-3,6.1,6.1,0,0,1-6.1-6.1,3,3,0,0,0-3-3H11V63h7.5a3,3,0,0,0,3-3,6.1,6.1,0,0,1,6.1-6.1,3,3,0,0,0,3-3V43.4H112v7.5a3,3,0,0,0,3,3A6.1,6.1,0,0,1,121,60a3,3,0,0,0,3,3h7.5V79.3H124a3,3,0,0,0-3,3,6.1,6.1,0,0,1-6.1,6.1A3,3,0,0,0,112,91.3ZM131.5,57h-4.9a12.1,12.1,0,0,0-8.7-8.7V43.4h13.6ZM24.5,43.4v4.9A12.1,12.1,0,0,0,15.9,57H11V43.4ZM11,85.3h4.9A12.1,12.1,0,0,0,24.5,94v5.1H11ZM118,99.1V94a12.1,12.1,0,0,0,8.7-8.7h4.9V99.1Z" />
        <path d="M151.3,115.8V54.2h-6v58.7H21.7v6H148.3A3,3,0,0,0,151.3,115.8Z" />
        <path d="M159,67.9v58.7H35.5v6H162a3,3,0,0,0,3-3V67.9Z" />
        <path d="M71.3,88.8A17.5,17.5,0,1,1,88.8,71.3,17.5,17.5,0,0,1,71.3,88.8Zm0-29A11.5,11.5,0,1,0,82.8,71.3,11.5,11.5,0,0,0,71.3,59.8Z" />
    </svg>
);
const userIcon: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170">
        <title>regular_black</title>
        <path d="M149.1,165h-6V132.3c0-18.8-14.2-34.8-32.5-36.8l-24,15.9a3,3,0,0,1-3.3,0L59.2,95.5C41,97.7,26.9,113.6,26.9,132.3V165h-6V132.3c0-22.5,16.7-40.9,38.8-42.9a3,3,0,0,1,1.9.5L85,105.3l23.2-15.4a3,3,0,0,1,1.9-.5c21.9,1.8,39,20.7,39,42.9Z" />
        <path d="M85,86.4A31.7,31.7,0,0,1,53.4,54.8V36.6a31.6,31.6,0,1,1,63.3,0V54.8A31.7,31.7,0,0,1,85,86.4Zm0-75.5A25.7,25.7,0,0,0,59.4,36.6V54.8a25.6,25.6,0,0,0,51.3,0V36.6A25.7,25.7,0,0,0,85,10.9Z" />
    </svg>
);

const TextBoxGroupPage: React.FunctionComponent = () => {
    const [textBoxGroupValue, setTextBoxGroupValue] = React.useState<string>("");
    const [textBoxGroupValue2, setTextBoxGroupValue2] = React.useState<string>("");
    const [textBoxGroupValue3, setTextBoxGroupValue3] = React.useState<string>("Not good");
    const [textBoxGroupValue4, setTextBoxGroupValue4] = React.useState<string>("All good");

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
                    <p>text box group with right text:</p>
                    <div className="result">
                        <TextBoxGroup
                            name="textInput"
                            label="Textbox group label"
                            placeholder="Text Box PlaceHolder"
                            value={textBoxGroupValue}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextBoxGroupValue(e.target.value)}
                            rightText="kr"
                        />
                    </div>
                    <p>text box group with left icon and disabled:</p>
                    <div className="result">
                        <TextBoxGroup
                            name="textInput2"
                            placeholder="Text Box PlaceHolder"
                            value={textBoxGroupValue2}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextBoxGroupValue2(e.target.value)}
                            leftIcon={moneyIcon}
                            disabled={true}
                        />
                    </div>
                    <p>text box group with both sides and error:</p>
                    <div className="result">
                        <TextBoxGroup
                            name="textInput3"
                            placeholder="Text Box PlaceHolder"
                            value={textBoxGroupValue3}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextBoxGroupValue3(e.target.value)}
                            leftIcon={moneyIcon}
                            rightIcon={userIcon}
                            onLeftClick={() => alert("Im clicking on Left icon")}
                            onRightClick={() => alert("Im clicking on Right icon")}
                            leftTitle="Click to view more of the left"
                            rightTitle="Click to view more of the right"
                            error="some error message"
                        />
                    </div>

                    <p>text box group with both sides and error:</p>
                    <div className="result">
                        <TextBoxGroup
                            name="textInput3"
                            placeholder="Text Box PlaceHolder"
                            value={textBoxGroupValue4}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextBoxGroupValue4(e.target.value)}
                            leftIcon={moneyIcon}
                            rightIcon={userIcon}
                            onLeftClick={() => alert("Im clicking on Left icon")}
                            onRightClick={() => alert("Im clicking on Right icon")}
                            leftTitle="Click to view more of the left"
                            rightTitle="Click to view more of the right"
                            success={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextBoxGroupPage;
