import * as React from "react";
import { Breadcrumb } from "../../../src/Breadcrumb/Breadcrumb";
import { AppSharedProps } from "typings/generic.type";
const Highlight = require("react-highlight").default;
const docMD: string = require("../../../src/Breadcrumb/readme.md");

const BreadcrumbPage: React.FunctionComponent<AppSharedProps> = (props: AppSharedProps) => {
    const breadcrumbList: Array<string> = ["First", "Second", "Third"];

    return (
        <div className={"route-template" + props.brief}>
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

export default BreadcrumbPage;
