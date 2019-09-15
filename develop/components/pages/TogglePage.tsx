import * as React from "react";
import { Toggle } from "../../../src/Toggle/Toggle";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Toggle/readme.md");

export default class TogglePage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            toggleValue: true
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
                            <Toggle
                                name="myToggle"
                                id="myToggleId"
                                label="Field label"
                                value={this.state.toggleValue}
                                onChange={(event) => { this.setState({ toggleValue: event.target.checked }); }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
