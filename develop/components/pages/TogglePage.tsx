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
                            label="Toggle label"
                            value={toggleValue}
                            id="my-toggle"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToggleValue(e.target.checked)}
                        />
                    </div>

                    <p>Disabled</p>
                    <div className="result">
                        <Toggle
                            name="checked-disabled"
                            label="Disabled - Checked"
                            value={true}
                            disabled={true}
                            onChange={() => null}
                        />
                        <Toggle
                            name="unchecked-disabled"
                            label="Disabled - Unchecked"
                            value={false}
                            disabled={true}
                            onChange={() => null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TogglePage;
