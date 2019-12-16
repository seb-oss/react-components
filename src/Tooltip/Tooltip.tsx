import * as React from "react";
import "./tooltip-style.scss";
import { TooltipPositionChecker } from "./placement";
import { randomId } from "../__utils/randomId";
import ReactDOM from "react-dom";
import debounce from "lodash/debounce";

const InfoCircleIcon: JSX.Element = <svg name="info-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-36 344h12V232h-12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h48c6.627 0 12 5.373 12 12v140h12c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12zm36-240c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z" /></svg>;

export interface TooltipMessageGroupItem {
    title?: string;
    message: string;
}

export type TooltipTrigger = "hover" | "click" | "focus";
export type TooltipTheme = "default" | "light" | "primary" | "warning" | "success" | "danger" | "purple";
export type TooltipPosition = "top" | "bottom" | "left" | "right" | "top-right" | "top-left" | "bottom-right" | "bottom-left" | "left-top" | "left-bottom" | "right-top" | "right-bottom";

export interface TooltipProps {
    className?: string;
    customSvg?: React.ReactNode;
    id?: string;
    ref?: React.LegacyRef<Tooltip>;
    /** @deprecated use content instead */
    message?: string;
    /** @deprecated use content instead */
    messageGroup?: Array<TooltipMessageGroupItem>;
    /** @deprecated use onVisibleChange instead */
    onClick?: (event?: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLElement>) => void;
    position?: TooltipPosition;
    theme?: TooltipTheme;
    /** @deprecated use content instead */
    title?: string;
    /** @deprecated use trigger instead */
    triggerOnHover?: boolean;
    /** @deprecated */
    width?: number;
    content?: string | React.ReactNode;
    trigger?: TooltipTrigger;
    disableAutoPosition?: boolean;
    onVisibleChange?: (event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLElement>, visible: boolean) => void;
    children?: React.ReactNode;
}

interface TooltipState {
    id: string;
    visible: boolean;
    tooltipContainer: HTMLDivElement;
    tooltipPositionChecker: TooltipPositionChecker;
}

export class Tooltip extends React.Component<TooltipProps, TooltipState> {
    private containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    private tooltipRootClassName: string = "tooltip-root-container";
    constructor(props: TooltipProps) {
        super(props);

        this.state = {
            id: "",
            visible: false,
            tooltipContainer: null,
            tooltipPositionChecker: null
        };

        this.forceDismiss = this.forceDismiss.bind(this);
    }

    componentDidMount() {
        const randID: string = this.constructId();
        this.constructTooltipContentContainer(randID);
    }

    componentDidUpdate(prevProps: TooltipProps) {
        if (prevProps.disableAutoPosition !== this.props.disableAutoPosition) {
            if (!!this.state.tooltipPositionChecker) {
                this.state.tooltipPositionChecker.toggleAutoPlacement(this.props.disableAutoPosition);
            }
            const eventListener: string = this.props.disableAutoPosition ? "remove" : "add";
            window[`${eventListener}EventListener`]("resize", debounce(this.getWithinViewportPosition, 500));
        }
        if (prevProps.theme !== this.props.theme && !!this.state.tooltipContainer) {
            const classNames: Array<string> = this.state.tooltipContainer.className.split(" ");
            classNames[1] = this.props.theme;
            this.state.tooltipContainer.className = classNames.join(" ");
        }
        if (!!this.state.tooltipContainer && (prevProps.content !== this.props.content || prevProps.message !== this.props.message || prevProps.messageGroup !== this.props.messageGroup)) {
            this.setTooltipContent(this.state.tooltipContainer);
        }

        if (!!this.props.message || !!this.props.messageGroup || !!this.props.onClick || !!this.props.title || !!this.props.customSvg || !!this.props.triggerOnHover || !!this.props.width) {
            console.warn(
                "%cmessage, messageGroup, onClick, title, customSvg, triggerOnHover, and width %cattributes will be %cdeprecated soon.",
                "font-weight: 900; font-size: 16px", "color: auto", "color:red; font-weight: 700;"
            );
        }

    }

    componentWillUnmount() {
        window.removeEventListener("resize", debounce(this.getWithinViewportPosition, 500));
    }

    /**
     * Forces the tooltip to dismiss
     * @param {React.MouseEvent<HTMLDivElement>} e Mouse event
     */
    forceDismiss(e?: React.MouseEvent<HTMLDivElement>) {
        if (e) {
            switch ((e.target as HTMLElement).className) {
                case "icon":
                case "message":
                case "message-container":
                case "triangle":
                    return;
                default: this.onTooltipToggle(e, false);
            }
        } else {
            this.onTooltipToggle(null, false);
        }
    }

    /**
     * Forces the tooltip to show
     */
    forceShow = (): void => {
        !this.state.visible && this.onTooltipToggle(null, true);
    }

    render() {
        return (
            <div
                className={"tooltip-container" + (this.props.className ? ` ${this.props.className}` : "")}
                id={this.props.id}
                ref={this.containerRef}
            >
                <div
                    className="tooltip-reference"
                    aria-describedby={this.state.id}
                    tabIndex={-1}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => ((!this.props.trigger && !this.props.triggerOnHover) || this.props.trigger === "click") && this.onTooltipToggle(e)}
                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => (this.props.triggerOnHover || this.props.trigger === "hover") && this.onTooltipToggle(e, true)}
                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => (this.props.triggerOnHover || this.props.trigger === "hover") && this.onTooltipToggle(e, false)}
                    onFocus={(e: React.FocusEvent<HTMLDivElement>) => this.props.trigger === "focus" && this.onTooltipToggle(e)}
                    onBlur={(e: React.FocusEvent<HTMLDivElement>) => this.onTooltipToggle(e, false)}
                >
                    {this.props.children || <div className="icon">{this.props.customSvg ? this.props.customSvg : InfoCircleIcon}</div>}
                </div>
            </div>
        );
    }

    /**
     * construct tooltip content container and append to root tooltip container
     * @param tooltipId unique tooltip id
     */
    private constructTooltipContentContainer = (tooltipId: string): void => {
        const tooltipRootArr: HTMLCollectionOf<Element> = document.body.getElementsByClassName(this.tooltipRootClassName);
        let tooltipRootRef: Element = tooltipRootArr && tooltipRootArr[0];
        if (tooltipRootArr.length === 0) {
            tooltipRootRef = document.createElement("div");
            tooltipRootRef.className = this.tooltipRootClassName;
            document.body.appendChild(tooltipRootRef);
        }
        const newTooltip: HTMLDivElement = document.createElement("div");
        newTooltip.className = `tooltip-content ${this.props.theme || "default"} ${this.props.position}`;
        newTooltip.id = tooltipId;
        newTooltip.setAttribute("role", "tooltip");
        this.setTooltipContent(newTooltip);
        tooltipRootRef.appendChild(newTooltip);
        this.setState({
            tooltipContainer: newTooltip,
            tooltipPositionChecker: new TooltipPositionChecker(this.containerRef.current, this.props.disableAutoPosition)
        }, () => {
            this.state.tooltipPositionChecker.addTooltipContainer(this.state.tooltipContainer);
        });
    }

    /**
     * construct unique tooltip id
     */
    private constructId = (): string => {
        const randId: string = randomId("tooltip-");
        this.setState({
            id: randId
        });
        return randId;
    }

    /**
     * set content of tooltip
     * @param tooltip tooltip element
     */
    private setTooltipContent = (tooltip: HTMLDivElement): void => {
        let content: string | React.ReactNode = this.props.content;
        if (!this.props.content) {
            if (this.props.message) {
                content = <TooltipMessage {...this.props} />;
            } else if (this.props.messageGroup) {
                content = <TooltipMessageGroup {...this.props} />;
            }
        }
        ReactDOM.render(<TooltipContent content={content} />, tooltip);
    }

    /**
     * set tooltip visibility
     * @param isVisible boolean
     */
    private setTooltipVisibility = (isVisible: boolean): void => {
        this.state.tooltipContainer.style.display = isVisible ? "block" : "none";
        if (isVisible) {
            this.getWithinViewportPosition();
        }
    }

    /**
     * toggle tooltip
     * @param toggle boolean
     * @param e event triggering the changes
     */
    private onTooltipToggle = (e?: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>, toggle?: boolean) => {
        const isVisible: boolean = toggle !== undefined ? toggle : !this.state.visible;
        this.setState({
            visible: isVisible
        });
        this.setTooltipVisibility(isVisible);
        this.props.onVisibleChange && this.props.onVisibleChange(e, isVisible);
        this.props.onClick && this.props.onClick(e);
    }

    /**
     * get tooltip position
     */
    private getWithinViewportPosition = (): void => {
        if (this.state.tooltipPositionChecker) {
            this.state.tooltipPositionChecker.getPosition((this.props.position || "top"));
        }
    }
}

type TooltipContent = Pick<TooltipProps, "content">;
const TooltipContent: React.FunctionComponent<TooltipContent> = (props: TooltipContent) => {
    return (
        <>
            <div className="tooltip-arrow" />
            <div className="tooltip-inner">
                {props.content}
            </div>
        </>
    );
};
type TooltipMessage = Pick<TooltipProps, "title" | "message" | "width">;
const TooltipMessage: React.FunctionComponent<TooltipMessage> = (props: TooltipMessage) => {
    return (
        <div className="message-container" style={{ width: `${props.width || 120}px` }}>
            {props.title && <div className="title">{props.title}</div>}
            <div className="message">{props.message || "Tooltip is empty. Please pass a message."}</div>
        </div>
    );
};
type TooltipMessageGroup = Pick<TooltipProps, "messageGroup" | "width">;
const TooltipMessageGroup: React.FunctionComponent<TooltipMessage> = (props: TooltipMessageGroup) => {
    return (
        <div className="message-container" style={{ width: `${props.width || 120}px` }}>
            {props.messageGroup.map((item, index) =>
                <div key={index} className="message-list-item">
                    {item.title && <div className="title">{item.title}</div>}
                    {item.message && <div className="message">{item.message}</div>}
                </div>
            )}
        </div>
    );
};
