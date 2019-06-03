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
                { value: "2", label: "2nd item" },
                { value: "3", label: "3rd item" },
            ],
            dropDownList1Selected: null,
            dropDownList2: [
                { value: "1", label: "1st item" },
                { value: "2", label: "2nd item" },
                { value: "3", label: "3rd item" },
                { value: "4", label: "4th item" },
                { value: "5", label: "5th item" },
            ],
            dropDownList2Selected: null,
            dropDownList3: [
                { value: "1", label: "1st item" },
                { value: "2", label: "2nd item" },
                { value: "3", label: "3rd item" },
            ],
            dropDownList3Selected: null
        };

        this.onChangeDropdown = this.onChangeDropdown.bind(this);
    }

    onChangeDropdown(value: DropDownItem | Array<DropDownItem>, name: string) {
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
                                searchable={true}
                                name="dropDownList1"
                                list={this.state.dropDownList1}
                                selectedValue={this.state.dropDownList1Selected}
                                onChange={(value: DropDownItem | Array<DropDownItem>) => this.onChangeDropdown(value, "dropDownList1Selected")}
                                clearable={true}
                            />
                        </div>

                        <p>Here is the multi select one:</p>
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
                                searchable={true}
                                name="dropDownList3"
                                list={this.state.dropDownList3}
                                selectedValue={this.state.dropDownList3Selected}
                                onChange={(value: DropDownItem | Array<DropDownItem>) => this.onChangeDropdown(value, "dropDownList3Selected")}
                                more={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
