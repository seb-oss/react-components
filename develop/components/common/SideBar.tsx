import * as React from "react";
import * as H from "history";
import { sortBy } from "lodash";
import { SideBarContent, SideBarItem } from "../../typings/generic.type";
const sidebarData: SideBarContent = require("../../assets/components-list.json");

const forms: Array<SideBarItem> = sortBy(sidebarData.form, "name");
const uis: Array<SideBarItem> = sortBy(sidebarData.ui, "name");
const others: Array<SideBarItem> = sortBy(sidebarData.other, "name");

interface SideBarProps {
    toggle: boolean;
    history: H.History;
}

const SideBar: React.FunctionComponent<SideBarProps> = (props: SideBarProps): React.ReactElement<void> => {
    const currentPath: string = props.history.location.pathname;

    /**
     * Navigates to the link provided in the `href`
     * @param e The click event from an `a`
     */
    function navigate(e: React.MouseEvent<HTMLAnchorElement>): void {
        e.preventDefault();
        const to: string = e.currentTarget.getAttribute("href").replace("#", "");
        if (to.charAt(0) !== "/") {
            window.open(to, e.currentTarget.getAttribute("target"));
        } else if (props.history.location.pathname.replace("#", "") !== to) {
            props.history.push(to);
        }
    }

    return (
        <div className={"side-bar" + (props.toggle ? " open" : "")}>
            <div className="category">
                <div className="title">How it works?</div>
                <div className="nav-holder">
                    <SideBarList list={sidebarData.links} currentPath={currentPath} onClick={navigate} />
                </div>
            </div>
            <div className="category">
                <div className="title">Components <h5 className="badge badge-secondary">{forms.length + uis.length + others.length}</h5></div>
                <div className="nav-holder">
                    <SideBarList title="Form" list={forms} currentPath={currentPath} onClick={navigate} />
                    <SideBarList title="UI" list={uis} currentPath={currentPath} onClick={navigate} />
                    <SideBarList title="Other" list={others} currentPath={currentPath} onClick={navigate} />
                </div>
            </div>
        </div>
    );
};

type SideBarListProps = {
    title?: string;
    list: Array<SideBarItem>;
    currentPath: string;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
};

const SideBarList: React.FunctionComponent<SideBarListProps> = (props: SideBarListProps) =>
    <>
        {props.title && <div className="sub-title">{props.title}</div>}
        {props.list.map((item: SideBarItem, index: number) =>
            <a
                key={index}
                href={item.path.charAt(0) === "/" ? "#" + item.path : item.path}
                target={item.path.charAt(0) === "/" ? "_self" : "_blank"}
                onClick={props.onClick}
                className={props.currentPath === item.path ? "active" : null}
            >
                <span>{item.name}</span>
            </a>
        )}
    </>;

export default SideBar;
