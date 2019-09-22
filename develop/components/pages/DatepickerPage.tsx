import * as React from "react";
import { Datepicker } from "../../../src/Datepicker/Datepicker";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Datepicker/readme.md");

const moreIcon: JSX.Element = <svg className="dropdown-more-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M192 256c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm88-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-240 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z" /></svg>;

const DatepickerPage: React.FunctionComponent = () => {
    const [datepicker, setDatepicker] = React.useState<Date>(new Date());
    const [datepicker2, setDatepicker2] = React.useState<Date>(new Date());
    const [datepicker3, setDatepicker3] = React.useState<Date>(new Date());

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
                        <Datepicker
                            name="datepicker"
                            value={datepicker}
                            onChange={setDatepicker}
                            minDate={new Date("1970-10-10")}
                            maxDate={new Date("2022-10-10")}
                            label="Datepicker label"
                        />
                    </div>

                    <p>With custom locale</p>
                    <div className="result">
                        <Datepicker
                            name="datepicker"
                            value={datepicker2}
                            onChange={setDatepicker2}
                            minDate={new Date("1970-10-10")}
                            maxDate={new Date("2022-10-10")}
                            label="Swedish date"
                            locale="sv-se"
                        />
                    </div>

                    <p>With custom custom calendar icon and clearable</p>
                    <div className="result">
                        <Datepicker
                            name="datepicker"
                            value={datepicker3}
                            onChange={setDatepicker3}
                            minDate={new Date("1970-10-10")}
                            maxDate={new Date("2022-10-10")}
                            calendarIcon={moreIcon}
                            clearable={true}
                            showLeadingZeros={false}
                        />
                    </div>

                    <p>Disabled</p>
                    <div className="result">
                        <Datepicker
                            name="datepicker"
                            value={datepicker3}
                            onChange={setDatepicker3}
                            minDate={new Date("1970-10-10")}
                            maxDate={new Date("2022-10-10")}
                            clearable={true}
                            disabled={true}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default DatepickerPage;
