import React from "react";
import { Breadcrumb, BreadcrumbItem } from "../../../src/Breadcrumb";
import { BreadcrumbItemProps } from "../../../src/Breadcrumb/BreadcrumbItem";
import Highlight from "react-highlight";
import HouseIcon from "../../assets/icons/house.svg";
import MusicIcon from "../../assets/icons/music.svg";
const docMD: string = require("../../../src/Breadcrumb/readme.md");

const BreadcrumbPage: React.FC = () => {
    /** Pops up a confirm alert before navigating to the clicked URL */
    const onNavigate: React.MouseEventHandler<HTMLAnchorElement> = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (confirm(`Do you want to navigate to ${e.currentTarget.hash}`)) {
            window.location.assign(e.currentTarget.hash);
        }
    };

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
                        <Breadcrumb list={list} onNavigate={onNavigate} />
                    </div>

                    <p>You can also use icons or any element</p>
                    <div className="result">
                        <Breadcrumb>
                            <BreadcrumbItem title="Home" href={window.location.hash}>
                                <HouseIcon />
                            </BreadcrumbItem>
                            <BreadcrumbItem title="Music">
                                <MusicIcon />
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
            </div>
        </div>
    );
};

const list: Array<BreadcrumbItemProps> = [
    { children: "About", href: "#/about", title: "Go to About page" },
    { children: "Accordion", href: "#/accordion", title: "Go to Accordion page for some reason" },
    { children: "Breadcrumb", href: "#/breadcrumb", title: "Do what's right and use titles" },
];

export default BreadcrumbPage;
