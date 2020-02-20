import * as React from "react";
import { Breadcrumb } from "../../../src/Breadcrumb/Breadcrumb";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/Breadcrumb/readme.md");

const userIcon: JSX.Element = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170"><title>regular_black</title><path d="M149.1,165h-6V132.3c0-18.8-14.2-34.8-32.5-36.8l-24,15.9a3,3,0,0,1-3.3,0L59.2,95.5C41,97.7,26.9,113.6,26.9,132.3V165h-6V132.3c0-22.5,16.7-40.9,38.8-42.9a3,3,0,0,1,1.9.5L85,105.3l23.2-15.4a3,3,0,0,1,1.9-.5c21.9,1.8,39,20.7,39,42.9Z" /><path d="M85,86.4A31.7,31.7,0,0,1,53.4,54.8V36.6a31.6,31.6,0,1,1,63.3,0V54.8A31.7,31.7,0,0,1,85,86.4Zm0-75.5A25.7,25.7,0,0,0,59.4,36.6V54.8a25.6,25.6,0,0,0,51.3,0V36.6A25.7,25.7,0,0,0,85,10.9Z" /></svg>;

const BreadcrumbPage: React.FunctionComponent = () => {
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
                    <p>Here are sample outputs</p>
                    <div className="result">
                        <Breadcrumb
                            list={breadcrumbList}
                            onClick={(i: number) => alert(`Should navigate to ${breadcrumbList[i]}`)}
                        />
                    </div>

                    <p>Passing icons as a breadcrumb item</p>
                    <div className="result">
                        <Breadcrumb
                            list={breadcrumbList2}
                            onClick={(i: number) => alert(`Should navigate to ${i}`)}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

const breadcrumbList: Array<string> = ["First", "Second", "Third"];
const breadcrumbList2: Array<string | React.ReactNode> = [
    userIcon, "Details"
];

export default BreadcrumbPage;
