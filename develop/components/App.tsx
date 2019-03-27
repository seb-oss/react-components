import * as React from "react";
import { Switch, withRouter } from "react-router-dom";
import * as Loadable from "react-loadable";
import Routing from "./Routing";
import TitleBar from "./common/TitleBar";
import SideBar from "./common/SideBar";
import { Loader } from "../../src/Loader/Loader";

// Here we are asynchronously loading components based on their path
const About = Loadable({ loader: () => import("./common/About"), loading: () => <Loader toggle={true} /> });

const ButtonPage = Loadable({ loader: () => import("./pages/ButtonPage"), loading: () => <Loader toggle={true} /> });
const TextBoxPage = Loadable({ loader: () => import("./pages/TextBoxPage"), loading: () => <Loader toggle={true} /> });
const TextBoxGroupPage = Loadable({ loader: () => import("./pages/TextBoxGroupPage"), loading: () => <Loader toggle={true} /> });
const TextAreaPage = Loadable({ loader: () => import("./pages/TextAreaPage"), loading: () => <Loader toggle={true} /> });
const TextLabelPage = Loadable({ loader: () => import("./pages/TextLabelPage"), loading: () => <Loader toggle={true} /> });
const CheckBoxPage = Loadable({ loader: () => import("./pages/CheckBoxPage"), loading: () => <Loader toggle={true} /> });
const DropdownPage = Loadable({ loader: () => import("./pages/DropdownPage"), loading: () => <Loader toggle={true} /> });
const DatepickerPage = Loadable({ loader: () => import("./pages/DatepickerPage"), loading: () => <Loader toggle={true} /> });
const RadioGroupPage = Loadable({ loader: () => import("./pages/RadioGroupPage"), loading: () => <Loader toggle={true} /> });
const RadioButtonPage = Loadable({ loader: () => import("./pages/RadioButtonPage"), loading: () => <Loader toggle={true} /> });
const DialoguePage = Loadable({ loader: () => import("./pages/DialoguePage"), loading: () => <Loader toggle={true} /> });
const TooltipPage = Loadable({ loader: () => import("./pages/TooltipPage"), loading: () => <Loader toggle={true} /> });
const LoaderPage = Loadable({ loader: () => import("./pages/LoaderPage"), loading: () => <Loader toggle={true} /> });
const RatingPage = Loadable({ loader: () => import("./pages/RatingPage"), loading: () => <Loader toggle={true} /> });
const TogglePage = Loadable({ loader: () => import("./pages/TogglePage"), loading: () => <Loader toggle={true} /> });
const SliderPage = Loadable({ loader: () => import("./pages/SliderPage"), loading: () => <Loader toggle={true} /> });
const ProgressBarPage = Loadable({ loader: () => import("./pages/ProgressBarPage"), loading: () => <Loader toggle={true} /> });
const IconPage = Loadable({ loader: () => import("./pages/IconPage"), loading: () => <Loader toggle={true} /> });
const CarouselPage = Loadable({ loader: () => import("./pages/CarouselPage"), loading: () => <Loader toggle={true} /> });
const PaginationPage = Loadable({ loader: () => import("./pages/PaginationPage"), loading: () => <Loader toggle={true} /> });
const ChartPage = Loadable({ loader: () => import("./pages/ChartPage"), loading: () => <Loader toggle={true} /> });
const StepperPage = Loadable({ loader: () => import("./pages/StepperPage"), loading: () => <Loader toggle={true} /> });
const ImagePage = Loadable({ loader: () => import("./pages/ImagePage"), loading: () => <Loader toggle={true} /> });
const TimelinePage = Loadable({ loader: () => import("./pages/TimelinePage"), loading: () => <Loader toggle={true} /> });
const StepTrackerPage = Loadable({ loader: () => import("./pages/StepTrackerPage"), loading: () => <Loader toggle={true} /> });
const BreadcrumbPage = Loadable({ loader: () => import("./pages/BreadcrumbPage"), loading: () => <Loader toggle={true} /> });
const AccordionPage = Loadable({ loader: () => import("./pages/AccordionPage"), loading: () => <Loader toggle={true} /> });
const InlineLinkPage = Loadable({ loader: () => import("./pages/InlineLinkPage"), loading: () => <Loader toggle={true} /> });
const TabsPage = Loadable({ loader: () => import("./pages/TabsPage"), loading: () => <Loader toggle={true} /> });
const VideoPage = Loadable({ loader: () => import("./pages/VideoPage"), loading: () => <Loader toggle={true} /> });
const NotificationPage = Loadable({ loader: () => import("./pages/NotificationPage"), loading: () => <Loader toggle={true} /> });
const TimepickerPage = Loadable({ loader: () => import("./pages/TimepickerPage"), loading: () => <Loader toggle={true} /> });
const ImageCropperPage = Loadable({ loader: () => import("./pages/ImageCropperPage"), loading: () => <Loader toggle={true} /> });
const TimerPage = Loadable({ loader: () => import("./pages/TimerPage"), loading: () => <Loader toggle={true} /> });
const NotFound = Loadable({ loader: () => import("./common/NotFound"), loading: () => <Loader toggle={true} /> });

interface AppState { sidebarToggle: boolean; }

class App extends React.Component<any, AppState>  {
    constructor(props: any) {
        super(props);
        this.state = {
            sidebarToggle: true
        };

        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar(): void {
        this.setState({ sidebarToggle: !this.state.sidebarToggle });
    }

    render() {
        const propsToSend = {};
        return (
            <div className="app-container">
                <TitleBar onToggleClick={this.toggleSidebar} history={this.props.history} />
                <div className={"route-holder" + (this.state.sidebarToggle ? " sidebar-opened" : "")}>
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
                </div>
                <SideBar toggle={this.state.sidebarToggle} />
            </div>
        );
    }
}

export default withRouter(App);
