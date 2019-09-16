import * as React from "react";
import { Breadcrumb } from "../../../src/Breadcrumb/Breadcrumb";
const Highlight = require("react-highlight").default;
const docMD: string = require("../../../src/Breadcrumb/readme.md");

const BreadcrumbPage: React.FunctionComponent = () => {
    return (
        <div className="route-template">
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
                            list={breadcrumbList}
                            onClick={(i: number) => { alert(`Should navigate to ${breadcrumbList[i]}`); }}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

const breadcrumbList: Array<string> = ["First", "Second", "Third"];

export default BreadcrumbPage;
