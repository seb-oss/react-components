import * as React from "react";
import { Link } from "react-router-dom";

const sidebarData = require("../../assets/sidebar.json");
const forms = sidebarData.form.sort((a, b) => { if (a.name < b.name) { return -1; } if (a.name > b.name) { return 1; } return 0; });
const uis = sidebarData.ui.sort((a, b) => { if (a.name < b.name) { return -1; } if (a.name > b.name) { return 1; } return 0; });
const others = sidebarData.other.sort((a, b) => { if (a.name < b.name) { return -1; } if (a.name > b.name) { return 1; } return 0; });

interface SideBarProps {
    toggle: boolean;
}

const SideBar: React.StatelessComponent<SideBarProps> = (props: SideBarProps): React.ReactElement<void> => {
    const str = location.href.toLowerCase();
    const page = str.substr(str.lastIndexOf("/"));

    return (
        <div className={"side-bar" + (props.toggle ? " open" : "")}>
            <div className="category">
                <div className="title">How it works?</div>
                <div className="nav-holder">
                    <Link to="/about" className={(page === "/" || page === "/about") ? "active" : ""}><span>About</span></Link>
                    <Link to="/release" className={page === "/release" ? "active" : ""}><span>Release Notes</span></Link>
                </div>
            </div>
            <div className="category">
                <div className="title">Components</div>
                <div className="nav-holder">
                    <div className="sub-title">Form</div>
                    {forms && forms.map((item, index) =>
                        <Link key={index} to={item.path} className={page === item.path ? "active" : ""}><span>{item.name}</span></Link>
                    )}
                    <div className="sub-title">UI</div>
                    {uis && uis.map((item, index) =>
                        <Link key={index} to={item.path} className={page === item.path ? "active" : ""}><span>{item.name}</span></Link>
                    )}
                    <div className="sub-title">Other</div>
                    {others && others.map((item, index) =>
                        <Link key={index} to={item.path} className={page === item.path ? "active" : ""}><span>{item.name}</span></Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
