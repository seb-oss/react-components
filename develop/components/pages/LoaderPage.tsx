import * as React from "react";
import { Loader } from "../../../src/Loader/Loader";
import { Button } from "../../../src/Button/Button";
import { TextBoxGroup } from "../../../src/TextBoxGroup/TextBoxGroup";
import SampleContainer from "../../assets/svgs/sample-container.svg";

import Highlight from "react-highlight";
const docMD: string = require("../../../src/Loader/readme.md");

const LoaderPage: React.FC = () => {
    const [textBox1, setTextBox1] = React.useState<string>("Text box group with loader");

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

                    <p>Here is a sample tiny example</p>
                    <div className="result">
                        <SampleContainer height={100} />
                        <Loader toggle={true} size="sm" />
                    </div>

                    <p>Here is a sample default example</p>
                    <div className="result">
                        <SampleContainer height={150} />
                        <Loader toggle={true} />
                    </div>

                    <p>Here is a sample large example</p>
                    <div className="result">
                        <SampleContainer height={200} />
                        <Loader toggle={true} size="lg" />
                    </div>

                    <p>Here is a sample in primary button</p>
                    <div className="result">
                        <Button theme="primary">
                            <span>Primary</span>
                            <Loader toggle={true} />
                        </Button>
                    </div>

                    <p>Here is a sample input field</p>
                    <div className="result">
                        <TextBoxGroup
                            name="text-box-1"
                            value={textBox1}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextBox1(e.target.value)}
                            rightIcon={<Loader toggle={true} />}
                            disabled={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoaderPage;
