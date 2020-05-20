import React from "react";
import { Dropdown, DropdownItem } from "../../../src/Dropdown/Dropdown";
import { Toggle } from "../../../src/Toggle/Toggle";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/Dropdown/readme.md");

const DropdownPage: React.FunctionComponent = () => {
    const [dropDownList1Selected, setDropdownList1Selected] = React.useState<DropdownItem>(null);
    const [dropDownList2Selected, setDropdownList2Selected] = React.useState<Array<DropdownItem>>([]);
    const [dropDownList3Selected, setDropdownList3Selected] = React.useState<DropdownItem>(null);
    const [dropDownList4Selected, setDropdownList4Selected] = React.useState<DropdownItem>(null);
    const [dropDownList5Selected, setDropdownList5Selected] = React.useState<Array<DropdownItem>>([]);
    const [disabled, setDisabled] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("");

    const handleToggleError = React.useCallback(() => {
        setError((currentError) => (currentError === null ? "Example error message" : null));
    }, [setError]);

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
                        <Dropdown
                            label="Single select"
                            list={dropDownList1}
                            selectedValue={dropDownList1Selected}
                            onChange={(value: DropdownItem) => setDropdownList1Selected(value)}
                            disabled={disabled}
                            error={error}
                        />
                    </div>

                    <p>Here is the multi select one with search:</p>
                    <div className="result">
                        <Dropdown
                            label="Multi-select"
                            name="dropDownList2"
                            list={dropDownList2}
                            selectedValue={dropDownList2Selected}
                            onChange={(value: Array<DropdownItem>) => setDropdownList2Selected(value)}
                            searchable={true}
                            placeholder="Multi option"
                            multi={true}
                            disabled={disabled}
                            error={error}
                        />
                    </div>

                    <p>Here is the more button version:</p>
                    <div className="result">
                        <Dropdown
                            name="dropDownList3"
                            list={dropDownList3}
                            selectedValue={dropDownList3Selected}
                            onChange={(value: DropdownItem) => setDropdownList3Selected(value)}
                            more={true}
                            disabled={disabled}
                            error={error}
                        />
                    </div>

                    <p>Here is the native version:</p>
                    <div className="result">
                        <Dropdown
                            label="Native dropdown"
                            name="dropDownList4"
                            list={dropDownList4}
                            selectedValue={dropDownList4Selected}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setDropdownList4Selected({ value: e.target.value, label: dropDownList4[e.target.selectedIndex].label });
                            }}
                            native={true}
                            disabled={disabled}
                            error={error}
                        />
                        <Dropdown
                            label="Native dropdown"
                            name="dropDownList4"
                            list={dropDownList4}
                            selectedValue={dropDownList5Selected}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                if (e && e.currentTarget.selectedOptions) {
                                    const values: Array<DropdownItem> = [];
                                    let option: HTMLOptionElement;
                                    for (let i = 0; i < e.currentTarget.selectedOptions.length; i++) {
                                        option = e.currentTarget.selectedOptions[i];
                                        values.push({ label: option.label, value: option.value });
                                    }
                                    setDropdownList5Selected(values);
                                }
                            }}
                            multi={true}
                            native={true}
                            disabled={disabled}
                            error={error}
                        />
                    </div>

                    <div className="result mt-5">
                        <Toggle name="disabled-toggle" label="Disabled all" value={disabled} onChange={(e) => setDisabled(e.target.checked)} />
                        <Toggle name="show-error-toggle" label="Show error messages" value={!!error} onChange={handleToggleError} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const dropDownList1: Array<DropdownItem> = [
    { value: "1", label: "Serbia" },
    { value: "2", label: "Nicaragua" },
    { value: "3", label: "Singapore" },
    { value: "4", label: "Guinea" },
    { value: "5", label: "Syrian Arab Republic" },
    { value: "6", label: "Tanzania" },
    { value: "7", label: "Anguilla" },
];
const dropDownList2: Array<DropdownItem> = [
    { value: "1", label: "Mexico" },
    { value: "2", label: "Guernsey" },
    { value: "3", label: "Lithuania" },
    { value: "4", label: "Poland" },
    { value: "5", label: "Montenegro" },
    { value: "6", label: "Iran" },
    { value: "7", label: "Myanmar" },
];
const dropDownList3: Array<DropdownItem> = [
    { value: "1", label: "Paraguay" },
    { value: "2", label: "Dominican Republic" },
    { value: "3", label: "Mongolia" },
    { value: "4", label: "Montserrat" },
    { value: "5", label: "Thailand" },
    { value: "6", label: "Japan" },
    { value: "7", label: "Saint Vincent and the Grenadines" },
];
const dropDownList4: Array<DropdownItem> = [
    { value: "1", label: "Sierra Leone" },
    { value: "2", label: "Malawi" },
    { value: "3", label: "Marshall Islands" },
    { value: "4", label: "Latvia" },
    { value: "5", label: "Slovenia" },
    { value: "6", label: "Argentina" },
    { value: "7", label: "Solomon Islands" },
];

export default DropdownPage;
