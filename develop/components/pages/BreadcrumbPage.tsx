import * as React from "react";
import { Breadcrumb } from "../../../src/Breadcrumb/Breadcrumb";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Breadcrumb/readme.md");

export default class BreadcrumbPage extends React.Component<any, { breadcrumbList: Array<string> }>  {
    constructor(props: any) {
        super(props);

        this.state = {
            breadcrumbList: ["First", "Second", "Third"]
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
                        <p>Here are sample outputs</p>
                        <div className="result">
                            <Breadcrumb
                                list={this.state.breadcrumbList}
                                onClick={(i: number) => { alert(`Should navigate to ${this.state.breadcrumbList[i]}`); }}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
