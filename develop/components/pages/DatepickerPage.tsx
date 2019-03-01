import * as React from "react";
import { Datepicker } from "../../../src/Datepicker/Datepicker";
import { getParameterByName } from "../../utils/queryString";
// import * as moment from "moment";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Datepicker/readme.md");

export default class DatepickerPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);

        this.state = {
            datepicker: new Date()
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
                            <Datepicker
                                name="datepicker"
                                value={this.state.datepicker}
                                onChange={(date) => this.setState({ datepicker: date })}
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
    }
}
