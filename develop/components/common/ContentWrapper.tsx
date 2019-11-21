import * as React from "react";
import { SideBarContent, SideBarItem } from "typings/generic.type.js";
import { Loader } from "../../../src/Loader/Loader";
import { Route, Switch, Redirect } from "react-router";

const links: SideBarContent = require("../../assets/components-list.json");
type RouteItem = { path: string, component: React.LazyExoticComponent<any> };

/** Routes are generated dynamically based on the information provided in `assets/components-list.json` */
const routes: Array<RouteItem> = [{ path: "/about", component: React.lazy(() => import("../common/About")) }];
links.links.map((item: SideBarItem) => {
    routes.push({ path: item.path, component: React.lazy(() => import(`../${item.filePath}`)) });
});
links.components.map((item: SideBarItem) => {
    routes.push({ path: item.path, component: React.lazy(() => import(`../${item.filePath}`)) });
});
routes.push({ path: "*", component: React.lazy(() => import("../common/NotFound")) });

export const ContentWrapper: React.FC = () => {
    return (
        <main className="content-wrapper">
            <div className="container">
                <React.Suspense fallback={<Loader toggle={true} fullscreen={true} />}>
                    <Switch>
                        {/* <Route path="/" exact={true}><Redirect to="/about" /></Route> */}
                        {routes.map((item: RouteItem, index: number) => <Route key={index} {...item} />)}
                    </Switch>
                </React.Suspense>
            </div>
        </main>
    );
};
