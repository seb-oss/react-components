import * as React from "react";
import { DropDown, DropDownItem } from "../../../src/DropDown/DropDown";
import { Toggle } from "../../../src/Toggle/Toggle";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/DropDown/readme.md");

const DropdownPage: React.FunctionComponent = () => {
    const [dropDownList1Selected, setDropDownList1Selected] = React.useState<DropDownItem>(null);
    const [dropDownList2Selected, setDropDownList2Selected] = React.useState<Array<DropDownItem>>(null);
    const [dropDownList3Selected, setDropDownList3Selected] = React.useState<DropDownItem>(null);
    const [dropDownList4Selected, setDropDownList4Selected] = React.useState<DropDownItem>(null);
    const [disabled, setDisabled] = React.useState<boolean>(false);

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
                    <p>Here is the basic one:</p>
                    <div className="result">
                        <DropDown
                            label="Single select"
                            list={dropDownList1}
                            selectedValue={dropDownList1Selected}
                            onChange={(value: DropDownItem) => setDropDownList1Selected(value)}
                            disabled={disabled}
                        />
                    </div>

                    <p>Here is the multi select one with search:</p>
                    <div className="result">
                        <DropDown
                            label="Multi-select"
                            name="dropDownList2"
                            list={dropDownList2}
                            selectedValue={dropDownList2Selected}
                            onChange={(value: Array<DropDownItem>) => setDropDownList2Selected(value)}
                            searchable={true}
                            placeholder="Multi option"
                            multi={true}
                            disabled={disabled}
                        />
                    </div>

                    <p>Here is the more button version:</p>
                    <div className="result">
                        <DropDown
                            name="dropDownList3"
                            list={dropDownList3}
                            selectedValue={dropDownList3Selected}
                            onChange={(value: DropDownItem) => setDropDownList3Selected(value)}
                            more={true}
                            disabled={disabled}
                        />
                    </div>

                    <p>Here is the native version:</p>
                    <div className="result">
                        <DropDown
                            label="Native dropdown"
                            name="dropDownList4"
                            list={dropDownList4}
                            selectedValue={dropDownList4Selected}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setDropDownList4Selected({ value: e.target.value, label: dropDownList4[e.target.selectedIndex].label });
                            }}
                            native={true}
                            disabled={disabled}
                        />
                    </div>

                    <div className="result mt-5">
                        <Toggle
                            name="disabled-toggle"
                            label="Disabled all"
                            value={disabled}
                            onChange={(e) => setDisabled(e.target.checked)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const dropDownList1: Array<DropDownItem> = [
    { value: "1", label: "Serbia" },
    { value: "2", label: "Nicaragua" },
    { value: "3", label: "Singapore" },
    { value: "4", label: "Guinea" },
    { value: "5", label: "Syrian Arab Republic" },
    { value: "6", label: "Tanzania" },
    { value: "7", label: "Anguilla" },
];
const dropDownList2: Array<DropDownItem> = [
    { value: "1", label: "Mexico" },
    { value: "2", label: "Guernsey" },
    { value: "3", label: "Lithuania" },
    { value: "4", label: "Poland" },
    { value: "5", label: "Montenegro" },
    { value: "6", label: "Iran" },
    { value: "7", label: "Myanmar" },
];
const dropDownList3: Array<DropDownItem> = [
    { value: "1", label: "Paraguay" },
    { value: "2", label: "Dominican Republic" },
    { value: "3", label: "Mongolia" },
    { value: "4", label: "Montserrat" },
    { value: "5", label: "Thailand" },
    { value: "6", label: "Japan" },
    { value: "7", label: "Saint Vincent and the Grenadines" },
];
const dropDownList4: Array<DropDownItem> = [
    { value: "1", label: "Sierra Leone" },
    { value: "2", label: "Malawi" },
    { value: "3", label: "Marshall Islands" },
    { value: "4", label: "Latvia" },
    { value: "5", label: "Slovenia" },
    { value: "6", label: "Argentina" },
    { value: "7", label: "Solomon Islands" },
];

export default DropdownPage;
