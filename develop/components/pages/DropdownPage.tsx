import * as React from "react";
import { DropDown, DropDownItem } from "../../../src/DropDown/DropDown";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/DropDown/readme.md");

export default class DropdownPage extends React.Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            dropDownList1: [
                { value: "1", label: "Serbia" },
                { value: "2", label: "Nicaragua" },
                { value: "3", label: "Singapore" },
                { value: "4", label: "Guinea" },
                { value: "5", label: "Syrian Arab Republic" },
                { value: "6", label: "Tanzania" },
                { value: "7", label: "Anguilla" },
            ],
            dropDownList1Selected: null,
            dropDownList2: [
                { value: "1", label: "Mexico" },
                { value: "2", label: "Guernsey" },
                { value: "3", label: "Lithuania" },
                { value: "4", label: "Poland" },
                { value: "5", label: "Montenegro" },
                { value: "6", label: "Iran" },
                { value: "7", label: "Myanmar" },
            ],
            dropDownList2Selected: null,
            dropDownList3: [
                { value: "1", label: "Paraguay" },
                { value: "2", label: "Dominican Republic" },
                { value: "3", label: "Mongolia" },
                { value: "4", label: "Montserrat" },
                { value: "5", label: "Thailand" },
                { value: "6", label: "Japan" },
                { value: "7", label: "Saint Vincent and the Grenadines" },
            ],
            dropDownList3Selected: null,
            dropDownList4: [
                { value: "1", label: "Sierra Leone" },
                { value: "2", label: "Malawi" },
                { value: "3", label: "Marshall Islands" },
                { value: "4", label: "Latvia" },
                { value: "5", label: "Slovenia" },
                { value: "6", label: "Argentina" },
                { value: "7", label: "Solomon Islands" },
            ],
            dropDownList4Selected: null
        };

        this.onChangeDropdown = this.onChangeDropdown.bind(this);
    }

    onChangeDropdown(value: DropDownItem | Array<DropDownItem> | string, name: string) {
        this.setState({ [name]: value });
    }

    render() {
        const mode = getParameterByName(this.props.location.search, "mode");
        return (
            <div className={"route-template " + ((mode === "dl" || mode === "DL") ? "brief" : "")}>
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
                                list={this.state.dropDownList1}
                                selectedValue={this.state.dropDownList1Selected}
                                onChange={(value: DropDownItem | Array<DropDownItem>) => this.onChangeDropdown(value, "dropDownList1Selected")}
                            />
                        </div>

                        <p>Here is the multi select one with search:</p>
                        <div className="result">
                            <DropDown
                                label="Dropdown label"
                                name="dropDownList2"
                                list={this.state.dropDownList2}
                                selectedValue={this.state.dropDownList2Selected}
                                onChange={(value: DropDownItem | Array<DropDownItem>) => this.onChangeDropdown(value, "dropDownList2Selected")}
                                searchable={true}
                                placeholder="Multi option"
                                multi={true}
                            />
                        </div>

                        <p>Here is the more button version:</p>
                        <div className="result">
                            <DropDown
                                name="dropDownList3"
                                list={this.state.dropDownList3}
                                selectedValue={this.state.dropDownList3Selected}
                                onChange={(item: DropDownItem) => console.log(`${item.label} - selected`)}
                                more={true}
                            />
                        </div>

                        <p>Here is the native version:</p>
                        <div className="result">
                            <DropDown
                                name="dropDownList4"
                                list={this.state.dropDownList4}
                                selectedValue={this.state.dropDownList4Selected}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.onChangeDropdown({ value: e.target.value, label: "" }, "dropDownList4Selected")}
                                native={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
