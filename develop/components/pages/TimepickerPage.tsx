import React from "react";
import { Timepicker, TimepickerValue, TimepickerDayperiodTypes } from "../../../src/Timepicker";
import Highlight from "react-highlight";
import docMD from "../../../src/Timepicker/readme.md";

const TimepickerPage: React.FC = () => {
    const [timepickerValue, setTimepickerValue] = React.useState<TimepickerValue>({ hours: 10, minutes: 0, dayperiod: TimepickerDayperiodTypes.AM });

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
                        <Timepicker value={timepickerValue} onChange={(value: TimepickerValue) => setTimepickerValue(value)} name="myTimepicker" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimepickerPage;
