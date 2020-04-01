import * as React from "react";
import { Timer } from "../../../src/Timer/Timer";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/Timer/readme.md");

const TimerPage: React.FunctionComponent = () => {
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
                        <Timer
                            duration={900000}
                            callback={() => {
                                console.log("TIMER ENDED callback");
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimerPage;
