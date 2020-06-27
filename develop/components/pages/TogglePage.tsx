import React from "react";
import { Toggle } from "../../../src/Toggle";
import Highlight from "react-highlight";
import { CheckBox } from "../../../src/CheckBox";
import docMD from "../../../src/Toggle/readme.md";

type TogglePageState = {
    inline: boolean;
    disabled: boolean;
};

const TogglePage: React.FC = () => {
    const [state, setState] = React.useState<TogglePageState>({
        inline: false,
        disabled: false,
    });

    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setState({ ...state, [e.target.name]: e.target.checked });
        },
        [state]
    );

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
                        <Toggle label="First" disabled={state.disabled} inline={state.inline} />
                        <Toggle label="Second" disabled={state.disabled} inline={state.inline} />
                    </div>

                    <div className="col-md-6 col-12">
                        <h3 className="border-bottom pb-2">Options</h3>
                        <div className="row">
                            <div className="col">
                                <CheckBox label="Inline" name="inline" checked={state.inline} onChange={changeHandler} />
                                <CheckBox label="Disabled" name="disabled" checked={state.disabled} onChange={changeHandler} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TogglePage;
