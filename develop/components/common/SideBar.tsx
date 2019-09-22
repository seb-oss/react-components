import * as React from "react";
import { Link } from "react-router-dom";
import * as H from "history";

const sidebarData = require("../../assets/sidebar.json");
const forms: Array<SideBarItem> = sidebarData.form.sort((a, b) => { if (a.name < b.name) { return -1; } if (a.name > b.name) { return 1; } return 0; });
const uis: Array<SideBarItem> = sidebarData.ui.sort((a, b) => { if (a.name < b.name) { return -1; } if (a.name > b.name) { return 1; } return 0; });
const others: Array<SideBarItem> = sidebarData.other.sort((a, b) => { if (a.name < b.name) { return -1; } if (a.name > b.name) { return 1; } return 0; });

type SideBarItem = { name: string, path: string };

interface SideBarProps {
    toggle: boolean;
    history: H.History;
}

const SideBar: React.FunctionComponent<SideBarProps> = (props: SideBarProps): React.ReactElement<void> => {
    const page: string = props.history.location.pathname;

    function noHash(path: string): string {
        return path.replace("#", "");
    }

    function navigate(e: React.MouseEvent<HTMLAnchorElement>): void {
        e.preventDefault();
        if (noHash(props.history.location.pathname) !== noHash(e.currentTarget.getAttribute("href"))) {
            props.history.push(noHash(e.currentTarget.getAttribute("href")));
        }
    }

    return (
        <div className={"side-bar" + (props.toggle ? " open" : "")}>
            <div className="category">
                <div className="title">How it works?</div>
                <div className="nav-holder">
                    <a href="#/about" onClick={navigate} className={(page === "/" || page === "/about") ? "active" : ""}><span>About</span></a>
                    <a href="https://github.com/sebgroup/react-components/issues" target="_blank"><span>Issues</span></a>
                    <a href="https://github.com/sebgroup/react-components/releases" target="_blank"><span>Release notes</span></a>
                </div>
            </div>
            <div className="category">
                <div className="title">Components</div>
                <div className="nav-holder">
                    {forms && <div className="sub-title">Form</div>}
                    {forms && forms.map((item: SideBarItem, index: number) =>
                        <a
                            key={index}
                            href={"#" + item.path}
                            onClick={navigate}
                            className={page === item.path ? "active" : null}
                        >
                            <span>{item.name}</span>
                        </a>
                    )}
                    {uis && <div className="sub-title">UI</div>}
                    {uis && uis.map((item: SideBarItem, index: number) =>
                        <a
                            key={index}
                            href={"#" + item.path}
                            onClick={navigate}
                            className={page === item.path ? "active" : null}
                        >
                            <span>{item.name}</span>
                        </a>
                    )}
                    {others && <div className="sub-title">Other</div>}
                    {others && others.map((item: SideBarItem, index: number) =>
                        <a
                            key={index}
                            href={"#" + item.path}
                            onClick={navigate}
                            className={page === item.path ? "active" : null}
                        >
                            <span>{item.name}</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
