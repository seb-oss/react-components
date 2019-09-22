import * as React from "react";
import { Toggle } from "../../../src/Toggle/Toggle";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/Toggle/readme.md");

const TogglePage: React.FunctionComponent = () => {
    const [toggleValue, setToggleValue] = React.useState<boolean>(true);

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
                        <Toggle
                            name="myToggle"
                            id="myToggleId"
                            label="Field label"
                            value={toggleValue}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToggleValue(e.target.checked)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TogglePage;
