import * as React from "react";
import { Datepicker } from "../../../src/Datepicker/Datepicker";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Datepicker/readme.md");

const DatepickerPage: React.FunctionComponent = () => {
    const [datepicker, setDatepicker] = React.useState(new Date());
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
                    <p>Here are sample outputs</p>
                    <div className="result">
                        <Datepicker
                            name="datepicker"
                            value={datepicker}
                            onChange={setDatepicker}
                            minDate={new Date("1970-10-10")}
                            maxDate={new Date("2022-10-10")}
                            label="Datepicker label"
                            placeHolder="dd/mm/yyyy"
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default DatepickerPage;
