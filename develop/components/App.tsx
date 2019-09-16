import * as React from "react";
import { Switch, withRouter } from "react-router-dom";
import TitleBar from "./common/TitleBar";
import SideBar from "./common/SideBar";
import { Loader } from "../../src/Loader/Loader";
import { RouteComponentProps, Route } from "react-router";
import { getParameterByName } from "../utils/queryString";

// Here we are asynchronously loading components based on their path
const About = React.lazy(() => import("./common/About"));
const ButtonPage = React.lazy(() => import("./pages/ButtonPage"));
const TextBoxPage = React.lazy(() => import("./pages/TextBoxPage"));
const TextBoxGroupPage = React.lazy(() => import("./pages/TextBoxGroupPage"));
const TextAreaPage = React.lazy(() => import("./pages/TextAreaPage"));
const TextLabelPage = React.lazy(() => import("./pages/TextLabelPage"));
const CheckBoxPage = React.lazy(() => import("./pages/CheckBoxPage"));
const DropdownPage = React.lazy(() => import("./pages/DropdownPage"));
const DatepickerPage = React.lazy(() => import("./pages/DatepickerPage"));
const RadioGroupPage = React.lazy(() => import("./pages/RadioGroupPage"));
const RadioButtonPage = React.lazy(() => import("./pages/RadioButtonPage"));
const DialoguePage = React.lazy(() => import("./pages/DialoguePage"));
const TooltipPage = React.lazy(() => import("./pages/TooltipPage"));
const LoaderPage = React.lazy(() => import("./pages/LoaderPage"));
const RatingPage = React.lazy(() => import("./pages/RatingPage"));
const TogglePage = React.lazy(() => import("./pages/TogglePage"));
const SliderPage = React.lazy(() => import("./pages/SliderPage"));
const ProgressBarPage = React.lazy(() => import("./pages/ProgressBarPage"));
const IconPage = React.lazy(() => import("./pages/IconPage"));
const CarouselPage = React.lazy(() => import("./pages/CarouselPage"));
const PaginationPage = React.lazy(() => import("./pages/PaginationPage"));
const ChartPage = React.lazy(() => import("./pages/ChartPage"));
const StepperPage = React.lazy(() => import("./pages/StepperPage"));
const ImagePage = React.lazy(() => import("./pages/ImagePage"));
const TimelinePage = React.lazy(() => import("./pages/TimelinePage"));
const StepTrackerPage = React.lazy(() => import("./pages/StepTrackerPage"));
const BreadcrumbPage = React.lazy(() => import("./pages/BreadcrumbPage"));
const AccordionPage = React.lazy(() => import("./pages/AccordionPage"));
const InlineLinkPage = React.lazy(() => import("./pages/InlineLinkPage"));
const TabsPage = React.lazy(() => import("./pages/TabsPage"));
const VideoPage = React.lazy(() => import("./pages/VideoPage"));
const NotificationPage = React.lazy(() => import("./pages/NotificationPage"));
const TimepickerPage = React.lazy(() => import("./pages/TimepickerPage"));
const ImageCropperPage = React.lazy(() => import("./pages/ImageCropperPage"));
const TimerPage = React.lazy(() => import("./pages/TimerPage"));
const ModalPage = React.lazy(() => import("./pages/ModalPage"));
const NotFound = React.lazy(() => import("./common/NotFound"));

interface AppState {
    sidebarToggle: boolean;
}

class App extends React.Component<RouteComponentProps, AppState> {
    constructor(props: any) {
        super(props);

        const sidebarToggle: boolean = localStorage.getItem("sidebar") === null
            ? undefined
            : JSON.parse(localStorage.getItem("sidebar"));

        this.state = {
            sidebarToggle: sidebarToggle !== undefined ? sidebarToggle : true
        };
    }

    toggleSidebar = () => this.setState({ sidebarToggle: !this.state.sidebarToggle }, () => localStorage.setItem("sidebar", String(this.state.sidebarToggle)));

    render() {
        const mode: string = getParameterByName(this.props.location.search, "mode");
        const brief: string = mode && mode.toLowerCase() === "dl" ? " brief" : "";
        return (
            <div className="app-container">
                <TitleBar onToggleClick={this.toggleSidebar} history={this.props.history} />
                <div className={"route-holder" + (this.state.sidebarToggle ? " sidebar-opened" : "") + brief}>
                    <React.Suspense fallback={<Loader toggle={true} fullscreen={true} />}>
                        <Switch>
                            <Route path="/" exact={true} component={About} />
                            <Route path={"/about"} component={About} />
                            <Route path={"/button"} component={ButtonPage} />
                            <Route path={"/textbox"} component={TextBoxPage} />
                            <Route path={"/textboxgroup"} component={TextBoxGroupPage} />
                            <Route path={"/textarea"} component={TextAreaPage} />
                            <Route path={"/textlabel"} component={TextLabelPage} />
                            <Route path={"/checkbox"} component={CheckBoxPage} />
                            <Route path={"/dropdown"} component={DropdownPage} />
                            <Route path={"/datepicker"} component={DatepickerPage} />
                            <Route path={"/radiogroup"} component={RadioGroupPage} />
                            <Route path={"/radiobtn"} component={RadioButtonPage} />
                            <Route path={"/dialogue"} component={DialoguePage} />
                            <Route path={"/modal"} component={ModalPage} />
                            <Route path={"/tooltip"} component={TooltipPage} />
                            <Route path={"/loader"} component={LoaderPage} />
                            <Route path={"/rating"} component={RatingPage} />
                            <Route path={"/toggle"} component={TogglePage} />
                            <Route path={"/slider"} component={SliderPage} />
                            <Route path={"/progressbar"} component={ProgressBarPage} />
                            <Route path={"/icons"} component={IconPage} />
                            <Route path={"/carousel"} component={CarouselPage} />
                            <Route path={"/pagination"} component={PaginationPage} />
                            <Route path={"/chart"} component={ChartPage} />
                            <Route path={"/stepper"} component={StepperPage} />
                            <Route path={"/image"} component={ImagePage} />
                            <Route path={"/timeline"} component={TimelinePage} />
                            <Route path={"/steptracker"} component={StepTrackerPage} />
                            <Route path={"/breadcrumb"} component={BreadcrumbPage} />
                            <Route path={"/accordion"} component={AccordionPage} />
                            <Route path={"/inlinelink"} component={InlineLinkPage} />
                            <Route path={"/tabs"} component={TabsPage} />
                            <Route path={"/video"} component={VideoPage} />
                            <Route path={"/notification"} component={NotificationPage} />
                            <Route path={"/timepicker"} component={TimepickerPage} />
                            <Route path={"/imagecropper"} component={ImageCropperPage} />
                            <Route path={"/timer"} component={TimerPage} />
                            <Route path="*" component={NotFound} props={null} />
                        </Switch>
                    </React.Suspense>
                </div>
                <SideBar toggle={this.state.sidebarToggle} />
            </div>
        );
    }
}

export default withRouter(App);
