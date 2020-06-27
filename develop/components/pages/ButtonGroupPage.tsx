import React from "react";
import { ButtonGroup, ButtonGroupSizes } from "../../../src/ButtonGroup";
import { RadioGroup, RadioListModel } from "../../../src/RadioGroup";
import { Button } from "../../../src/Button";
import { CheckBox } from "../../../src/CheckBox";
import Highlight from "react-highlight";
import docMD from "../../../src/ButtonGroup/readme.md";

type ButtonPageState = {
    vertical: boolean;
    hasSize: boolean;
    size: ButtonGroupSizes;
};

const ButtonPage: React.FC = () => {
    const [state, setState] = React.useState<ButtonPageState>({
        vertical: false,
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
                    <div>
                        <ButtonGroup size={state.size} vertical={state.vertical}>
                            <Button theme="outline-primary">First</Button>
                            <Button theme="outline-primary">Second</Button>
                            <Button theme="outline-primary">Third</Button>
                        </ButtonGroup>
                    </div>

                    <p>Options</p>
                    <div className="row">
                        <div className="col">
                            <p>Options</p>
                            <CheckBox label="Vertical" name="vertical" checked={state.vertical} onChange={changeHandler} />
                            <CheckBox label="Size" name="hasSize" checked={state.hasSize} onChange={changeHandler} />
                            {state.hasSize && <RadioGroup name="size" className="pl-4" list={sizeList} value={state.size} onChange={changeHandler} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const sizeList: Array<RadioListModel<ButtonGroupSizes>> = [
    { label: "Small", value: "sm" },
    { label: "Medium", value: "md" },
    { label: "Large", value: "lg" },
];

export default ButtonPage;
