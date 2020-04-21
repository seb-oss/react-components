import React, { ReactHTML } from "react";
import { Button, ButtonTheme, ButtonSize } from "../../../src/Button/Button";
import { Loader } from "../../../src/Loader/Loader";
import { RadioGroup, RadioListModel } from "../../../src/RadioGroup/RadioGroup";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import Highlight from "react-highlight";
import PencilIcon from "../../assets/icons/pencil.svg";
import { capitalize } from "@sebgroup/frontend-tools/dist/capitalize";
const docMD: string = require("../../../src/Button/readme.md");

type ButtonPageState = {
    theme: ButtonTheme;
    block: boolean;
    disabled: boolean;
    hasLoader: boolean;
    hasIcon: boolean;
    hasSize: boolean;
    size: ButtonSize;
};

const ButtonPage: React.FC = () => {
    const [state, setState] = React.useState<ButtonPageState>({
        theme: "primary",
        block: false,
        disabled: false,
        hasLoader: false,
        hasIcon: false,
        hasSize: false,
        size: null,
    });

    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newState: ButtonPageState = { ...state };
            switch (e.target.type) {
                case "radio":
                    newState[e.target.name] = e.target.value;
                    break;
                case "checkbox":
                    newState[e.target.name] = e.target.checked;
                    break;
            }
            /** Reset size */
            if (e.target.name === "hasSize" && !e.target.checked) {
                newState.size = null;
            }
            setState(newState);
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
                    <div className={"result p-3" + (state.theme === "light" ? " bg-dark" : "") + (state.theme === "dark" ? " bg-warning" : "")}>
                        <Button title="Click me" theme={state.theme} onClick={null} disabled={state.disabled} block={state.block} size={state.size}>
                            {capitalize(state.theme).replace("-", " ")}
                            {state.hasIcon && <PencilIcon className="ml-2" fill="currentColor" />}
                            {state.hasLoader && <Loader toggle={true} />}
                        </Button>
                    </div>

                    <p>Options</p>
                    <div className="row">
                        <div className="col">
                            <p>Themes</p>
                            <RadioGroup name="theme" list={themeList} value={state.theme} onChange={changeHandler} condensed />
                        </div>
                        <div className="col">
                            <p>Options</p>
                            <CheckBox label="Disabled" name="disabled" checked={state.disabled} onChange={changeHandler} condensed />
                            <CheckBox label="Block" name="block" checked={state.block} onChange={changeHandler} condensed />
                            <CheckBox label="Loader" name="hasLoader" checked={state.hasLoader} onChange={changeHandler} condensed />
                            <CheckBox label="Icon" name="hasIcon" checked={state.hasIcon} onChange={changeHandler} condensed />
                            <CheckBox label="Size" name="hasSize" checked={state.hasSize} onChange={changeHandler} condensed />
                            {state.hasSize && <RadioGroup className="pl-4" list={sizeList} value={state.size} condensed name="size" onChange={changeHandler} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const themeList: Array<RadioListModel<ButtonTheme>> = [
    { label: "Primary", value: "primary" },
    { label: "Primary (outlined)", value: "outline-primary" },
    { label: "Secondary", value: "secondary" },
    { label: "Danger", value: "danger" },
    { label: "Danger (outlined)", value: "outline-danger" },
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
    { label: "Link", value: "link" },
];
const sizeList: Array<RadioListModel<ButtonSize>> = [
    { label: "Small", value: "sm" },
    { label: "Medium", value: "md" },
    { label: "Large", value: "lg" },
];

export default ButtonPage;
