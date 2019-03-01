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
                { value: "1", label: "1st item" },
                { value: "2", label: "2nd item" },
                { value: "3", label: "3rd item" },
            ],
            dropDownSelected1: null,
            dropDownList2: [
                { value: "1", label: "1st" },
                { value: "2", label: "2nd" },
                { value: "3", label: "3rd" },
                { value: "4", label: "4th" },
                { value: "5", label: "5th" },
            ],
            dropDownSelected2: null,
            dropDownList3: [
                { value: "1", label: "1st item" },
                { value: "2", label: "2nd item" },
                { value: "3", label: "3rd item" },
            ],
            dropDownSelected3: null
        };
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
                                selectedValue={this.state.dropDownSelected1}
                                list={this.state.dropDownList1}
                                label="Dropdown label"
                                onChange={(selectedItem: DropDownItem) => { this.setState({ dropDownSelected1: selectedItem }); }}
                                placeholder="Single option"
                            />
                        </div>

                        <p>Here is the multi select one:</p>
                        <div className="result">
                            <DropDown
                                selectedValue={this.state.dropDownSelected2}
                                list={this.state.dropDownList2}
                                onChange={(selectedItem: DropDownItem) => { this.setState({ dropDownSelected2: selectedItem }); }}
                                searchable={true}
                                placeholder="Multi option"
                                multi={true}
                                clearable={true}
                            />
                        </div>

                        <p>Here is the native one:</p>
                        <div className="result">
                            <DropDown
                                selectedValue={this.state.dropDownSelected3}
                                list={this.state.dropDownList3}
                                onChange={(selectedItem: DropDownItem) => { this.setState({ dropDownSelected3: selectedItem }); }}
                                placeholder="Native option"
                                native={true}
                            />
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}
