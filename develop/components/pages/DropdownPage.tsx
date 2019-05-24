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
                { value: "1", selected: false, label: "1st item" },
                { value: "2", selected: false, label: "2nd item" },
                { value: "3", selected: false, label: "3rd item" },
            ],
            dropDownList2: [
                { value: "1", selected: false, label: "1st item" },
                { value: "2", selected: false, label: "2nd item" },
                { value: "3", selected: false, label: "3rd item" },
                { value: "4", selected: false, label: "4th item" },
                { value: "5", selected: false, label: "5th item" },
            ],
            dropDownList3: [
                { value: "1", selected: false, label: "1st item" },
                { value: "2", selected: false, label: "2nd item" },
                { value: "3", selected: false, label: "3rd item" },
            ],
        };

        this.onChangeDropdown = this.onChangeDropdown.bind(this);
    }

    onChangeDropdown(list: Array<DropDownItem>, name: string) {
        this.setState({ [name]: list });
    }

    render() {
        // console.log(this.state);
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
                                name="dropDownList1"
                                list={this.state.dropDownList1}
                                label="Dropdown label"
                                onChange={this.onChangeDropdown}
                                clearable={true}
                            />
                        </div>

                        <p>Here is the multi select one:</p>
                        <div className="result">
                            <DropDown
                                name="dropDownList2"
                                list={this.state.dropDownList2}
                                onChange={this.onChangeDropdown}
                                searchable={true}
                                placeholder="Multi option"
                                multi={true}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
