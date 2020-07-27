import React from "react";
import { Timer } from "../../../src/Timer";
import Highlight from "react-highlight";
import docMD from "../../../src/Timer/readme.md";

const TimerPage: React.FC = () => (
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
                    <Timer duration={60} onTimerEnded={() => alert("TIMER ENDED callback")} />
                </div>
            </div>
        </div>
    </div>
);

export default TimerPage;
