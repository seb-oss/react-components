import * as React from "react";
import { Loader, LoaderSize, LoaderType } from "../../../src/Loader/Loader";
import { Button } from "../../../src/Button/Button";
import { TextBoxGroup } from "../../../src/TextBoxGroup/TextBoxGroup";
import SampleContainer from "../../assets/svgs/sample-container.svg";
import Highlight from "react-highlight";
import { RadioGroup, RadioListModel } from "../../../src/RadioGroup/RadioGroup";
import { Link } from "react-router-dom";
import { Dropdown, DropdownItem } from "../../../src/Dropdown/Dropdown";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import classnames from "classnames";
const docMD: string = require("../../../src/Loader/readme.md");

type Colors = "primary" | "secondary" | "warning" | "danger" | "success" | "white" | "info" | "light" | "dark" | "body" | "muted";
const lightColors: Array<Colors> = ["white", "secondary", "light"];

const LoaderPage: React.FC = () => {
    const [size, setSize] = React.useState<LoaderSize>("md");
    const [type, setType] = React.useState<LoaderType>("spinner");
    const [color, setColor] = React.useState<DropdownItem<Colors>>();
    const [showText, setShowText] = React.useState<boolean>(false);

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

                    <div className="result">
                        <SampleContainer color={lightColors.some((c: Colors) => c === color?.value) ? "#636363" : "#efefef"} height={200} />
                        <Loader className={classnames({ [`text-${color?.value}`]: color?.value })} size={size} type={type} cover>
                            {showText && <p className={classnames("mt-1", "mb-0", `text-${size}`)}>Loading, please wait...</p>}
                        </Loader>
                    </div>
                </div>
                <div className="info">
                    <h2>Options</h2>

                    <div className="row">
                        <div className="col-12">
                            <CheckBox label="Render text inside" name="show-text" checked={showText} onChange={(e) => setShowText(e.target.checked)} />
                        </div>
                        <div className="col">
                            <p>Size</p>
                            <RadioGroup name="size" value={size} list={sizeList} onChange={(e) => setSize(e.target.value as LoaderSize)} condensed />
                        </div>
                        <div className="col">
                            <p>Type</p>
                            <RadioGroup name="type" value={type} list={typeList} onChange={(e) => setType(e.target.value as LoaderType)} condensed />
                        </div>
                        <div className="col">
                            <p>Color</p>
                            <Dropdown searchable list={colorList} selectedValue={color} onChange={(value: DropdownItem) => setColor(value)} />
                            <p className="small">
                                Placing the loader inside another component will have it inherit the color of the font. Alternatively, you can color the loader by passing Bootstrap text color classes
                            </p>
                        </div>
                    </div>
                </div>
                <div className="info">
                    <h2>Combinations</h2>

                    <p>
                        Inside a <Link to="/button">Button</Link>
                    </p>
                    <div className="result">
                        <Button theme="primary" disabled>
                            Saving...
                            <Loader className="ml-2" size="xs" />
                        </Button>
                    </div>

                    <p>
                        Inside a <Link to="/textboxgroup">TextBoxGroup</Link>
                    </p>
                    <div className="result">
                        <TextBoxGroup name="disabled-textbox" value="Disabled TextBoxGroup" onChange={() => {}} rightIcon={<Loader />} disabled />
                    </div>
                </div>
            </div>
        </div>
    );
};

const sizeList: Array<RadioListModel<LoaderSize>> = [
    { value: "xs", label: "Extra small (xs)" },
    { value: "sm", label: "Small (sm)" },
    { value: "md", label: "Medium (md)" },
    { value: "lg", label: "Large (lg)" },
];

const typeList: Array<RadioListModel<LoaderType>> = [
    { value: "spinner", label: "Spinner" },
    { value: "square", label: "Square" },
];

const colorList: Array<DropdownItem<Colors>> = [
    { value: undefined, label: "none" },
    { value: "primary", label: "text-primary" },
    { value: "secondary", label: "text-secondary" },
    { value: "warning", label: "text-warning" },
    { value: "danger", label: "text-danger" },
    { value: "success", label: "text-success" },
    { value: "white", label: "text-white" },
    { value: "info", label: "text-info" },
    { value: "light", label: "text-light" },
    { value: "dark", label: "text-dark" },
    { value: "body", label: "text-body" },
    { value: "muted", label: "text-muted" },
];

export default LoaderPage;
