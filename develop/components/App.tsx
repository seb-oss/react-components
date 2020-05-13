import React from "react";
import { Switch, withRouter, Route, Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router";
// Components
import TitleBar from "./common/TitleBar";
import SideBar from "./common/SideBar";
import { Loader } from "../../src/Loader/Loader";
import { getParameterByName } from "../__utils/queryString";
import { SideBarContent, SideBarItem } from "typings/generic.type";
const sidebarData: SideBarContent = require("../assets/components-list.json");
type RouteItem = { path: string; component: React.LazyExoticComponent<React.FC> };

/** Routes are generated dynamically based on the information provided in `assets/components-list.json` */
const routes: Array<RouteItem> = [{ path: "/about", component: React.lazy(() => import("./common/About")) }];
[sidebarData.form, sidebarData.ui, sidebarData.other].map((category: Array<SideBarItem>) =>
    category.map((item: SideBarItem) => {
        routes.push({ path: item.path, component: React.lazy(() => import(`./${item.filePath}`)) });
    })
);
routes.push({ path: "*", component: React.lazy(() => import("./common/NotFound")) });

const storedSidebarToggle: boolean = localStorage.getItem("sidebar") === null ? true : JSON.parse(localStorage.getItem("sidebar"));

const App: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const [sidebarToggle, setSidebarToggle] = React.useState<boolean>(storedSidebarToggle);
    const [brief, setBrief] = React.useState<boolean>(false);

    const toggleSidebar = React.useCallback(() => {
        localStorage.setItem("sidebar", String(!sidebarToggle));
        setSidebarToggle(!sidebarToggle);
    }, [sidebarToggle]);

    React.useEffect(() => {
        const mode: string = getParameterByName(props.location.search, "mode");
        const isBrief: boolean = mode && mode.toLowerCase() === "dl";
        isBrief !== brief && setBrief(isBrief);
    }, [props.location, brief]);

    return (
        <div className="app-container">
            <TitleBar onToggleClick={toggleSidebar} history={props.history} />
            <div className={"route-holder" + (sidebarToggle ? " sidebar-opened" : "") + (brief ? " brief" : "")}>
                <React.Suspense fallback={<Loader toggle={true} fullscreen={true} />}>
                    <Switch>
                        <Route path="/" exact={true}>
                            <Redirect to="/about" />
                        </Route>
                        {routes.map((item: RouteItem, index: number) => (
                            <Route key={index} {...item} />
                        ))}
                    </Switch>
                </React.Suspense>
            </div>
            <SideBar toggle={sidebarToggle} history={props.history} />
        </div>
    );
};

export default withRouter(App);
