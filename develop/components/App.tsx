import * as React from "react";
import { Switch, withRouter } from "react-router-dom";
import { RouteComponentProps, Route, Redirect } from "react-router";
// Components
import TitleBar from "./common/TitleBar";
import SideBar from "./common/SideBar";
import { Loader } from "../../src/Loader/Loader";
import { getParameterByName } from "../utils/queryString";

type RouteItem = { path: string, component: React.LazyExoticComponent<any> };

// Here we are asynchronously loading components based on their path
const routes: Array<RouteItem> = [
    { path: "/about", component: React.lazy(() => import("./common/About")) },
    // --- Components -----
    { path: "/accordion", component: React.lazy(() => import("./pages/AccordionPage")) },
    { path: "/breadcrumb", component: React.lazy(() => import("./pages/BreadcrumbPage")) },
    { path: "/button", component: React.lazy(() => import("./pages/ButtonPage")) },
    { path: "/carousel", component: React.lazy(() => import("./pages/CarouselPage")) },
    { path: "/chart", component: React.lazy(() => import("./pages/ChartPage")) },
    { path: "/checkbox", component: React.lazy(() => import("./pages/CheckBoxPage")) },
    { path: "/datepicker", component: React.lazy(() => import("./pages/DatepickerPage")) },
    { path: "/dialogue", component: React.lazy(() => import("./pages/DialoguePage")) },
    { path: "/dropdown", component: React.lazy(() => import("./pages/DropdownPage")) },
    { path: "/icons", component: React.lazy(() => import("./pages/IconPage")) },
    { path: "/image", component: React.lazy(() => import("./pages/ImageCropperPage")) },
    { path: "/imagecropper", component: React.lazy(() => import("./pages/ImagePage")) },
    { path: "/inlinelink", component: React.lazy(() => import("./pages/InlineLinkPage")) },
    { path: "/loader", component: React.lazy(() => import("./pages/LoaderPage")) },
    { path: "/modal", component: React.lazy(() => import("./pages/ModalPage")) },
    { path: "/notification", component: React.lazy(() => import("./pages/NotificationPage")) },
    { path: "/pagination", component: React.lazy(() => import("./pages/PaginationPage")) },
    { path: "/progressbar", component: React.lazy(() => import("./pages/ProgressBarPage")) },
    { path: "/radiobtn", component: React.lazy(() => import("./pages/RadioButtonPage")) },
    { path: "/radiogroup", component: React.lazy(() => import("./pages/RadioGroupPage")) },
    { path: "/rating", component: React.lazy(() => import("./pages/RatingPage")) },
    { path: "/slider", component: React.lazy(() => import("./pages/SliderPage")) },
    { path: "/stepper", component: React.lazy(() => import("./pages/StepperPage")) },
    { path: "/steptracker", component: React.lazy(() => import("./pages/StepTrackerPage")) },
    { path: "/tabs", component: React.lazy(() => import("./pages/TabsPage")) },
    { path: "/textarea", component: React.lazy(() => import("./pages/TextAreaPage")) },
    { path: "/textbox", component: React.lazy(() => import("./pages/TextBoxGroupPage")) },
    { path: "/textboxgroup", component: React.lazy(() => import("./pages/TextBoxPage")) },
    { path: "/textlabel", component: React.lazy(() => import("./pages/TextLabelPage")) },
    { path: "/timeline", component: React.lazy(() => import("./pages/TimelinePage")) },
    { path: "/timepicker", component: React.lazy(() => import("./pages/TimepickerPage")) },
    { path: "/timer", component: React.lazy(() => import("./pages/TimerPage")) },
    { path: "/toggle", component: React.lazy(() => import("./pages/TogglePage")) },
    { path: "/tooltip", component: React.lazy(() => import("./pages/TooltipPage")) },
    { path: "/video", component: React.lazy(() => import("./pages/VideoPage")) },
    // --- End Components -----
    { path: "*", component: React.lazy(() => import("./common/NotFound")) }
];

const storedSidebarToggle: boolean = localStorage.getItem("sidebar") === null ? true : JSON.parse(localStorage.getItem("sidebar"));

const App: React.FunctionComponent<RouteComponentProps> = (props: RouteComponentProps) => {
    const [sidebarToggle, setSidebarToggle] = React.useState<boolean>(storedSidebarToggle);
    const [brief, setBrief] = React.useState<boolean>(false);

    React.useEffect(() => {
        const mode: string = getParameterByName(props.location.search, "mode");
        const isBrief: boolean = mode && mode.toLowerCase() === "dl";
        (isBrief !== brief) && setBrief(isBrief);
    }, [props.location]);

    function toggleSidebar(): void {
        localStorage.setItem("sidebar", String(!sidebarToggle));
        setSidebarToggle(!sidebarToggle);
    }

    return (
        <div className="app-container">
            <TitleBar onToggleClick={toggleSidebar} history={props.history} />
            <div className={"route-holder" + (sidebarToggle ? " sidebar-opened" : "") + (brief ? " brief" : "")}>
                <React.Suspense fallback={<Loader toggle={true} fullscreen={true} />}>
                    <Switch>
                        <Route path="/" exact={true}><Redirect to="/about" /></Route>
                        {routes.map((item: RouteItem, index: number) => <Route key={index} {...item} />)}
                    </Switch>
                </React.Suspense>
            </div>
            <SideBar toggle={sidebarToggle} history={props.history} />
        </div>
    );
};

export default withRouter(App);
