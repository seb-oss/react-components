import * as React from "react";
import { Button, ButtonTheme, ButtonIconPosition, ButtonSizes } from "../../../src/Button/Button";
import { Loader } from "../../../src/Loader/Loader";
import { RadioGroup, RadioListModel } from "../../../src/RadioGroup/RadioGroup";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/Button/readme.md");

const mysvg: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M12.8 371.2L.2 485.3c-1.7 15.3 11.2 28.2 26.5 26.5l114.2-12.7 352.4-352.4c25-25 25-65.5 0-90.5l-37.5-37.5c-25-25-65.5-25-90.5 0L12.8 371.2zm113.3 97.4L33 478.9l10.3-93.1 271.9-271.9 82.7 82.7-271.8 272zm344.5-344.5L420.7 174 338 91.3l49.9-49.9c12.5-12.5 32.7-12.5 45.3 0l37.5 37.5c12.4 12.4 12.4 32.7-.1 45.2z" />
    </svg>
);

const ButtonPage: React.FunctionComponent = () => {
    const themeList: Array<RadioListModel<ButtonTheme>> = [
        { label: "Primary", value: "primary" },
        { label: "Primary (outlined)", value: "outline-primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Danger", value: "danger" },
        { label: "Ghost-dark", value: "ghost-dark" },
        { label: "Ghost-light", value: "ghost-light" },
        { label: "Link", value: "link" },
    ];
    const iconPositionList: Array<RadioListModel<ButtonIconPosition>> = [
        { label: "Right", value: "right" },
        { label: "Left", value: "left" },
    ];
    const sizeList: Array<RadioListModel<ButtonSizes>> = [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
    ];
    const [theme, setTheme] = React.useState<ButtonTheme>("primary");
    const [iconPosition, setIconPosition] = React.useState<ButtonIconPosition>("right");
    const [disabled, setDisabled] = React.useState<boolean>(false);
    const [hasLoader, setHasLoader] = React.useState<boolean>(false);
    const [hasIcon, setHasIcon] = React.useState<boolean>(false);
    const [hasSize, setHasSize] = React.useState<boolean>(false);
    const [size, setSize] = React.useState<ButtonSizes>("md");

    function iconCheckboxChanged(e: React.ChangeEvent<HTMLInputElement>) {
        setHasIcon(e.target.checked);
        !e.target.checked && setIconPosition("right"); // Clear icon position
    }

    function sizeCheckboxChanged(e: React.ChangeEvent<HTMLInputElement>) {
        setHasSize(e.target.checked);
        !e.target.checked && setSize("md"); // Reset size
    }

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
                    <div className={"result p-3" + (theme === "ghost-light" ? " bg-dark" : "") + (theme === "ghost-dark" ? " bg-warning" : "")}>
                        <Button
                            title="Click me"
                            label={theme}
                            theme={theme}
                            onClick={null}
                            disabled={disabled}
                            iconPosition={hasIcon ? iconPosition : null}
                            icon={hasIcon && iconPosition ? mysvg : null}
                            size={size}
                        >
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
                            <CheckBox label="Loader" name="loader" checked={hasLoader} onChange={(e) => setHasLoader(e.target.checked)} condensed />
                            <CheckBox label="Icon" name="icon" checked={hasIcon} onChange={iconCheckboxChanged} condensed />
                            {hasIcon && (
                                <RadioGroup
                                    className="pl-4"
                                    list={iconPositionList}
                                    value={iconPosition}
                                    condensed
                                    name="icon-position"
                                    onChange={(e) => setIconPosition(e.target.value as ButtonIconPosition)}
                                />
                            )}
                            <CheckBox label="Size" name="size" checked={hasSize} onChange={sizeCheckboxChanged} condensed />
                            {hasSize && <RadioGroup className="pl-4" list={sizeList} value={size} condensed name="icon-size" onChange={(e) => setSize(e.target.value as ButtonSizes)} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ButtonPage;
