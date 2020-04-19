import React from "react";
import { Button, ButtonTheme, ButtonSizes } from "../../../src/Button/Button";
import { Loader } from "../../../src/Loader/Loader";
import { RadioGroup, RadioListModel } from "../../../src/RadioGroup/RadioGroup";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import Highlight from "react-highlight";
import PencilIcon from "../../assets/icons/pencil.svg";
import { capitalize } from "@sebgroup/frontend-tools/dist/capitalize";
const docMD: string = require("../../../src/Button/readme.md");

const ButtonPage: React.FC = () => {
    const [theme, setTheme] = React.useState<ButtonTheme>("primary");
    const [block, setBlock] = React.useState<boolean>(false);
    const [disabled, setDisabled] = React.useState<boolean>(false);
    const [hasLoader, setHasLoader] = React.useState<boolean>(false);
    const [hasIcon, setHasIcon] = React.useState<boolean>(false);
    const [hasSize, setHasSize] = React.useState<boolean>(false);
    const [size, setSize] = React.useState<ButtonSizes>(null);

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
                    <div className={"result p-3" + (theme === "light" ? " bg-dark" : "") + (theme === "dark" ? " bg-warning" : "")}>
                        <Button title="Click me" theme={theme} onClick={null} disabled={disabled} block={block} size={size}>
                            {capitalize(theme).replace("-", " ")}
                            {hasIcon && <PencilIcon className="ml-2" fill="currentColor" />}
                            {hasLoader && <Loader toggle={true} />}
                        </Button>
                    </div>

                    <p>Options</p>
                    <div className="row">
                        <div className="col">
                            <p>Themes</p>
                            <RadioGroup name="theme" list={themeList} value={theme} onChange={(e) => setTheme(e.currentTarget.value as ButtonTheme)} condensed />
                        </div>
                        <div className="col">
                            <p>Options</p>
                            <CheckBox label="Disabled" name="disabled" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} condensed />
                            <CheckBox label="Block" name="block" checked={block} onChange={(e) => setBlock(e.target.checked)} condensed />
                            <CheckBox label="Loader" name="loader" checked={hasLoader} onChange={(e) => setHasLoader(e.target.checked)} condensed />
                            <CheckBox label="Icon" name="icon" checked={hasIcon} onChange={(e) => setHasIcon(e.target.checked)} condensed />
                            <CheckBox label="Size" name="size" checked={hasSize} onChange={sizeCheckboxChanged} condensed />
                            {hasSize && <RadioGroup className="pl-4" list={sizeList} value={size} condensed name="button-size" onChange={(e) => setSize(e.target.value as ButtonSizes)} />}
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
const sizeList: Array<RadioListModel<ButtonSizes>> = [
    { label: "Small", value: "sm" },
    { label: "Medium", value: "md" },
    { label: "Large", value: "lg" },
];

export default ButtonPage;
