import React from "react";
import { ButtonGroup, ButtonGroupSizes } from "../../../src/ButtonGroup/ButtonGroup";
import { Button } from "../../../src/Button";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import Highlight from "react-highlight";
import { RadioGroup, RadioListModel } from "../../../src/RadioGroup/RadioGroup";
const docMD: string = require("../../../src/ButtonGroup/readme.md");

const ButtonPage: React.FC = () => {
    const [vertical, setVertical] = React.useState<boolean>(false);
    const [hasSize, setHasSize] = React.useState<boolean>(false);
    const [size, setSize] = React.useState<ButtonGroupSizes>(null);

    const sizeCheckboxChanged: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setHasSize(e.target.checked);
            !e.target.checked && setSize(null); // Reset size
        },
        [setHasSize, setSize]
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
                        <ButtonGroup size={size} vertical={vertical}>
                            <Button theme="outline-primary">First</Button>
                            <Button theme="outline-primary">Second</Button>
                            <Button theme="outline-primary">Third</Button>
                        </ButtonGroup>
                    </div>

                    <p>Options</p>
                    <div className="row">
                        <div className="col">
                            <p>Options</p>
                            <CheckBox label="Vertical" name="vertical" checked={vertical} onChange={(e) => setVertical(e.target.checked)} condensed />
                            <CheckBox label="Size" name="size" checked={hasSize} onChange={sizeCheckboxChanged} condensed />
                            {hasSize && <RadioGroup className="pl-4" list={sizeList} value={size} condensed name="icon-size" onChange={(e) => setSize(e.target.value as ButtonGroupSizes)} />}
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
