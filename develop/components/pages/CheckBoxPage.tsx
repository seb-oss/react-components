import * as React from "react";
import { CheckBox } from "../../../src/CheckBox/CheckBox";
import { AppSharedProps } from "typings/generic.type";
const Highlight = (require("react-highlight")).default;
const docMD: string = require("../../../src/CheckBox/readme.md");

interface CheckBoxPageState {
    [key: string]: any;
    checkbox1: boolean;
    checkbox2: boolean;
    checkbox3: boolean;
}

class CheckBoxPage extends React.Component<AppSharedProps, CheckBoxPageState>  {

    constructor(props: any) {
        super(props);

        this.state = {
            checkbox1: true,
            checkbox2: false,
            checkbox3: true
        };

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ [event.currentTarget.name]: event.currentTarget.checked });
    }

    render() {
        return (
            <div className={"route-template" + this.props.brief}>
                <div className="info-holder">

                    <div className="info">
                        <div className="md-file">
                            <Highlight innerHTML={true}>{docMD}</Highlight>
                        </div>
                    </div>

                    <div className="info">
                        <h2>Output</h2>
                        <p>Here are few checkboxes with different configurations:</p>
                        <div className="result">
                            <CheckBox
                                name="checkbox1"
                                label="Checkbox 1"
                                checked={this.state.checkbox1}
                                onChange={this.handleCheckboxChange}
                            />
                            <CheckBox
                                name="checkbox2"
                                label="Checkbox 2"
                                checked={this.state.checkbox2}
                                onChange={this.handleCheckboxChange}
                                description="Some description"
                            />
                            <CheckBox
                                name="checkbox3"
                                label="Checkbox 3"
                                checked={this.state.checkbox3}
                                onChange={this.handleCheckboxChange}
                                disabled={true}
                                description="Disabled"
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default CheckBoxPage;
