import React from "react";
import H from "history";
import { useHistory } from "react-router";
import { Breadcrumb, BreadcrumbItem } from "../../../src/Breadcrumb/Breadcrumb";
import Highlight from "react-highlight";
const docMD: string = require("../../../src/Breadcrumb/readme.md");

const houseIcon: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M1092,444.005a0.978,0.978,0,0,1-.29.709,0.841,0.841,0,0,1-.19.132A2.194,2.194,0,0,1,1090,446h-1v8a2,2,0,0,1-2,2h-14a2,2,0,0,1-2-2v-8h-1a2,2,0,0,1-1.99-1.942c0-.015-0.01-0.03-0.01-0.045V444h0a0.97,0.97,0,0,1,.29-0.666l10.9-10.906a0.53,0.53,0,0,1,.1-0.143,1.037,1.037,0,0,1,1.42,0,0.535,0.535,0,0,1,.1.144l10.9,10.905a0.97,0.97,0,0,1,.29.666h0v0Zm-13,10h2v-5h-2v5Zm1-19.619L1070.38,444H1073v10h4v-6a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v6h4V444h2.62Z"
            transform="translate(-1068 -432)"
        />
    </svg>
);
const musicIcon: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M1088,312a4,4,0,1,1,2-7.445v-14.31l-14,4.49V307a0.925,0.925,0,0,1-.07.332,3.691,3.691,0,0,1,.07.668,4.046,4.046,0,1,1-2-3.445V294a0.9,0.9,0,0,1,1.14-.971l15.62-5.009a0.959,0.959,0,0,1,.2-0.011c0.01,0,.03-0.009.04-0.009a0.146,0.146,0,0,1,.02,0,0.941,0.941,0,0,1,.89.6,0.015,0.015,0,0,1,.01.016c0.01,0.025.03,0.044,0.04,0.07,0.01,0.054,0,.106.01,0.16a0.792,0.792,0,0,1,.03.154v19A4,4,0,0,1,1088,312Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,1088,306Zm-16,0a2,2,0,1,0,2,2A2,2,0,0,0,1072,306Z"
            transform="translate(-1068 -288)"
        />
    </svg>
);

const BreadcrumbPage: React.FunctionComponent = () => {
    const history: H.History = useHistory();

    const clickHandler: React.MouseEventHandler<HTMLAnchorElement> = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (confirm(`This will take you to ${e.currentTarget.href}. Do you want to continue?`)) {
            history.push(e.currentTarget.hash.replace("#", ""));
        }
    }, []);

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
                    <p>
                        You can either click to navigate, or hit <b>Right click</b> and select <b>Open link in a new tab</b>
                    </p>
                    <div className="result">
                        <Breadcrumb list={breadcrumbList1} onClick={clickHandler} />
                    </div>

                    <p>You can also use icons or any element</p>
                    <div className="result">
                        <Breadcrumb
                            list={breadcrumbList2}
                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                e.preventDefault();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const breadcrumbList1: Array<BreadcrumbItem> = [
    { text: "About", href: "#/about", title: "Go to About page" },
    { text: "Accordion", href: "#/accordion", title: "Go to Accordion page for some reason" },
    { text: "Breadcrumb", href: "#/breadcrumb", title: "Do what's right and use titles" },
];
const breadcrumbList2: Array<BreadcrumbItem> = [
    { text: houseIcon, title: "House" },
    { text: musicIcon, title: "Music" },
];

export default BreadcrumbPage;
