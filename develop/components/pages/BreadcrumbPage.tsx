import React from "react";
import H from "history";
import { useHistory } from "react-router";
import { Breadcrumb, BreadcrumbItem } from "../../../src/Breadcrumb/Breadcrumb";
import Highlight from "react-highlight";
import { ReactComponent as HouseIcon } from "../../assets/icons/house.svg";
import { ReactComponent as MusicIcon } from "../../assets/icons/music.svg";
const docMD: string = require("../../../src/Breadcrumb/readme.md");

const BreadcrumbPage: React.FC = () => {
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
    { text: <HouseIcon />, title: "House" },
    { text: <MusicIcon />, title: "Music" },
];

export default BreadcrumbPage;
