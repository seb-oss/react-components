import * as React from "react";
import { Datepicker } from "../../../src/Datepicker/Datepicker";
import * as moment from "moment";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/Datepicker/readme.md");

const moreIcon: JSX.Element = (
    <svg className="dropdown-more-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M192 256c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm88-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-240 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z" />
    </svg>
);

const minDate: Date = moment().subtract(30, "years").toDate();
const maxDate: Date = moment().add(8, "years").toDate();

const DatepickerPage: React.FunctionComponent = () => {
    const [datepicker, setDatepicker] = React.useState<Date>(new Date());
    const [datepicker2, setDatepicker2] = React.useState<Date>(new Date());
    const [datepicker3, setDatepicker3] = React.useState<Date>(new Date());
    const [datepicker4, setDatepicker4] = React.useState<Date>(new Date());

    return (
        <div className="route-template container">
            <div className="info-holder">
                <div className="info">
                    <div className="md-file">
                        <Highlight innerHTML={true}>{docMD}</Highlight>
                    </div>
                </div>

                {/* <Datepicker value={datepicker} onChange={setDatepicker} /> */}

                <div className="info">
                    <h2>Output</h2>
                    <p>Here are sample outputs</p>
                    <div className="result">
                        <Datepicker value={datepicker} onChange={setDatepicker} min={minDate} max={maxDate} />
                    </div>

                    <p>With custom locale</p>
                    <div className="result">
                        <Datepicker value={datepicker2} onChange={setDatepicker2} min={minDate} max={maxDate} localeCode="sv-se" />
                    </div>

                    <p>Month picker</p>
                    <div className="result">
                        <Datepicker monthPicker value={datepicker4} onChange={setDatepicker4} min={minDate} max={maxDate} />
                    </div>

                    <p>Disabled</p>
                    <div className="result">
                        <Datepicker value={datepicker3} onChange={setDatepicker3} min={minDate} max={maxDate} disabled={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatepickerPage;
