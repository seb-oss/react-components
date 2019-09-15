import * as React from "react";
import { Switch, withRouter } from "react-router-dom";
import Routing from "./Routing";
import TitleBar from "./common/TitleBar";
import SideBar from "./common/SideBar";
import { Loader } from "../../src/Loader/Loader";
import { AppSharedProps } from "typings/generic.type";
import { RouteComponentProps } from "react-router";
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
        const propsToSend: AppSharedProps = {
            mode: getParameterByName(this.props.location.search, "mode"),
            get brief() {
                return this.mode && this.mode.toLowerCase() === "dl" ? " brief" : "";
            }
        };
        return (
            <div className="app-container">
                <TitleBar onToggleClick={this.toggleSidebar} history={this.props.history} />
                <div className={"route-holder" + (this.state.sidebarToggle ? " sidebar-opened" : "")}>
                    <React.Suspense fallback={<Loader toggle={true} fullscreen={true} />}>
                        <Switch>
                            <Routing path="/" exact={true} component={About} props={propsToSend} />
                            <Routing path={"/about"} component={About} props={propsToSend} />
                            <Routing path={"/button"} component={ButtonPage} props={propsToSend} />
                            <Routing path={"/textbox"} component={TextBoxPage} props={propsToSend} />
                            <Routing path={"/textboxgroup"} component={TextBoxGroupPage} props={propsToSend} />
                            <Routing path={"/textarea"} component={TextAreaPage} props={propsToSend} />
                            <Routing path={"/textlabel"} component={TextLabelPage} props={propsToSend} />
                            <Routing path={"/checkbox"} component={CheckBoxPage} props={propsToSend} />
                            <Routing path={"/dropdown"} component={DropdownPage} props={propsToSend} />
                            <Routing path={"/datepicker"} component={DatepickerPage} props={propsToSend} />
                            <Routing path={"/radiogroup"} component={RadioGroupPage} props={propsToSend} />
                            <Routing path={"/radiobtn"} component={RadioButtonPage} props={propsToSend} />
                            <Routing path={"/dialogue"} component={DialoguePage} props={propsToSend} />
                            <Routing path={"/modal"} component={ModalPage} props={propsToSend} />
                            <Routing path={"/tooltip"} component={TooltipPage} props={propsToSend} />
                            <Routing path={"/loader"} component={LoaderPage} props={propsToSend} />
                            <Routing path={"/rating"} component={RatingPage} props={propsToSend} />
                            <Routing path={"/toggle"} component={TogglePage} props={propsToSend} />
                            <Routing path={"/slider"} component={SliderPage} props={propsToSend} />
                            <Routing path={"/progressbar"} component={ProgressBarPage} props={propsToSend} />
                            <Routing path={"/icons"} component={IconPage} props={propsToSend} />
                            <Routing path={"/carousel"} component={CarouselPage} props={propsToSend} />
                            <Routing path={"/pagination"} component={PaginationPage} props={propsToSend} />
                            <Routing path={"/chart"} component={ChartPage} props={propsToSend} />
                            <Routing path={"/stepper"} component={StepperPage} props={propsToSend} />
                            <Routing path={"/image"} component={ImagePage} props={propsToSend} />
                            <Routing path={"/timeline"} component={TimelinePage} props={propsToSend} />
                            <Routing path={"/steptracker"} component={StepTrackerPage} props={propsToSend} />
                            <Routing path={"/breadcrumb"} component={BreadcrumbPage} props={propsToSend} />
                            <Routing path={"/accordion"} component={AccordionPage} props={propsToSend} />
                            <Routing path={"/inlinelink"} component={InlineLinkPage} props={propsToSend} />
                            <Routing path={"/tabs"} component={TabsPage} props={propsToSend} />
                            <Routing path={"/video"} component={VideoPage} props={propsToSend} />
                            <Routing path={"/notification"} component={NotificationPage} props={propsToSend} />
                            <Routing path={"/timepicker"} component={TimepickerPage} props={propsToSend} />
                            <Routing path={"/imagecropper"} component={ImageCropperPage} props={propsToSend} />
                            <Routing path={"/timer"} component={TimerPage} props={propsToSend} />
                            <Routing path="*" component={NotFound} props={null} />
                        </Switch>
                    </React.Suspense>
                </div>
                <SideBar toggle={this.state.sidebarToggle} />
            </div>
        );
    }
}

export default withRouter(App);
