import * as React from "react";
import { Timepicker, TimepickerValue, TimepickerDayperiodTypes } from "../../../src/Timepicker/Timepicker";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Timepicker/readme.md");

interface TimepickerPageState {
    timerpickerValue: TimepickerValue;
}

export default class TimepickerPage extends React.Component<any, TimepickerPageState>  {
    constructor(props: any) {
        super(props);
        this.state = {
            timerpickerValue: {
                hours: 10,
                minutes: 0,
                dayperiod: TimepickerDayperiodTypes.AM
            }
        };
    }

    render() {
        const mode = getParameterByName(this.props.location.search, "mode");
        return (
            <div className={"route-template " + ((mode === "dl" || mode === "DL") ? "brief" : "")}>
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
                            <Timepicker
                                value={this.state.timerpickerValue}
                                onChange={(newValue: TimepickerValue) => { this.setState({ timerpickerValue: { ...newValue } }); }}
                                name="myTimepicker"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
