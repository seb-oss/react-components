import React from "react";
import { ElementPosition } from "./placement";
import { randomId } from "@sebgroup/frontend-tools";
import { Overlay } from "./Overlay";
import "./tooltip-style.scss";

const InfoCircleIcon: JSX.Element = (
    <svg name="info-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-36 344h12V232h-12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h48c6.627 0 12 5.373 12 12v140h12c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12zm36-240c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z" />
    </svg>
);

export interface TooltipMessageGroupItem {
    title?: string;
    message: string;
}

export type TooltipTrigger = "hover" | "click" | "focus";
export type TooltipTheme = "default" | "light" | "primary" | "warning" | "success" | "danger" | "purple";
export type TooltipPosition = ElementPosition;

export interface TooltipProps {
    /** Element class name */
    className?: string;
    /** @deprecated A direct svg code or a component with svg */
    customSvg?: React.ReactNode;
    /** Element id */
    id?: string;
    /** @deprecated use content instead */
    message?: string;
    /** @deprecated use content instead */
    messageGroup?: Array<TooltipMessageGroupItem>;
    /** @deprecated use onVisibleChange instead */
    onClick?: (event?: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLElement> | React.TouchEvent<HTMLDivElement>) => void;
    /** Css style positions: top/bottom/left/right */
    position?: TooltipPosition;
    /** Based on SEB predefined colors */
    theme?: TooltipTheme;
    /** @deprecated use content instead */
    title?: string;
    /** @deprecated use trigger instead */
    triggerOnHover?: boolean;
    /** @deprecated */
    width?: number;
    /** Tooltip content */
    content?: string | React.ReactNode;
    /** Tooltip trigger mode */
    trigger?: TooltipTrigger;
    /** Force tooltip to be at certain position */
    disableAutoPosition?: boolean;
    /** callback on tooltip visibility status change */
    onVisibleChange?: (event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLElement> | React.TouchEvent<HTMLDivElement>, visible: boolean) => void;
}
interface TooltipState {
    visible: boolean;
    referenceId: string;
}

/** A text label that acts as a helper to a specific item */
export class Tooltip extends React.Component<TooltipProps, TooltipState> {
    private containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    private contentRef: React.RefObject<HTMLDivElement> = React.createRef();

    constructor(props: TooltipProps) {
        super(props);

        this.state = {
            visible: false,
            referenceId: randomId("tooltip-ref"),
        };

        this.forceDismiss = this.forceDismiss.bind(this);
    }

    componentDidUpdate() {
        if (!!this.props.message || !!this.props.messageGroup || !!this.props.onClick || !!this.props.title || !!this.props.customSvg || !!this.props.triggerOnHover || !!this.props.width) {
            console.warn("message, messageGroup, onClick, title, customSvg, triggerOnHover, and width attributes will be deprecated soon.");
        }
    }

    /**
     * Forces the tooltip to dismiss
     * @param {React.MouseEvent<HTMLDivElement>} e Mouse event
     */
    forceDismiss(e?: React.MouseEvent<HTMLDivElement>) {
        console.log("forceDismiss is deprecating. Tooltip will be hidden if it lost focus");
    }

    /**
     * Forces the tooltip to show
     */
    forceShow = (): void => {
        !this.state.visible && this.onTooltipToggle(null, true);
    };

    onTooltipContentBlur = (e: React.FocusEvent<HTMLDivElement>): void => {
        const triggeredNode: Node = (e.relatedTarget as Node) || document.activeElement;
        const isWithinTriggerNode: boolean = this.containerRef.current.contains(triggeredNode);
        if (this.state.visible && !isWithinTriggerNode) {
            this.onTooltipToggle(e, false);
        } else if (this.props.trigger === "focus" && isWithinTriggerNode) {
            this.contentRef?.current?.focus();
        }
    };

    onHover = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, toggleOn: boolean) => {
        (this.props.triggerOnHover || this.props.trigger === "hover") && this.onTooltipToggle(e, toggleOn);
    };

    onClickEvent = (e: React.MouseEvent<HTMLDivElement>) => {
        ((!this.props.trigger && !this.props.triggerOnHover) || this.props.trigger === "click") && this.onTooltipToggle(e);
    };

    onMouseEnterEvent = (e: React.MouseEvent<HTMLDivElement>) => this.onHover(e, true);
    onMouseLeaveEvent = (e: React.MouseEvent<HTMLDivElement>) => this.onHover(e, false);
    onTouchStartEvent = (e: React.TouchEvent<HTMLDivElement>) => this.onHover(e, true);
    onTouchEndEvent = (e: React.TouchEvent<HTMLDivElement>) => this.onHover(e, false);
    onFocusEvent = (e: React.FocusEvent<HTMLDivElement>) => this.props.trigger === "focus" && this.onTooltipToggle(e, true);

    // TODO: remove customSvg when attribute is removed
    render() {
        return (
            <div className={"tooltip-container" + (this.props.className ? ` ${this.props.className}` : "")} id={this.props.id}>
                <div
                    id={this.state.referenceId}
                    ref={this.containerRef}
                    className={`tooltip-reference${this.props.trigger === "click" ? " cursor" : ""}`}
                    tabIndex={-1}
                    onClick={this.onClickEvent}
                    onMouseEnter={this.onMouseEnterEvent}
                    onMouseLeave={this.onMouseLeaveEvent}
                    onTouchStart={this.onTouchStartEvent}
                    onTouchEnd={this.onTouchEndEvent}
                    onFocus={this.onFocusEvent}
                >
                    {this.props.children || <div className="default-content">{this.props.customSvg ? this.props.customSvg : InfoCircleIcon}</div>}
                </div>
                <TooltipContentContainer {...this.props} ref={this.contentRef} onContentBlur={this.onTooltipContentBlur} show={this.state.visible} tooltipReference={() => this.containerRef.current} />
            </div>
        );
    }

    /**
     * toggle tooltip
     * @param toggle boolean
     * @param e event triggering the changes
     */
    private onTooltipToggle = (e?: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, toggle?: boolean): void => {
        const isVisible: boolean = toggle !== undefined ? toggle : !this.state.visible;
        this.setState(
            {
                visible: isVisible,
            },
            () => {
                this.props.onVisibleChange && this.props.onVisibleChange(e, isVisible);
                this.props.onClick && this.props.onClick(e);
            }
        );
    };
}

type TooltipContentContainerProps = Pick<TooltipProps, "theme" | "position" | "content" | "message" | "messageGroup" | "title" | "disableAutoPosition"> & {
    show: boolean;
    tooltipReference: () => HTMLDivElement;
    onContentBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
    ref?: React.Ref<HTMLDivElement>;
};
const TooltipContentContainer: React.FC<TooltipContentContainerProps> = React.forwardRef((props: TooltipContentContainerProps, ref: React.RefObject<HTMLDivElement>) => {
    return (
        <Overlay ref={ref} show={props.show} onBlur={props.onContentBlur} position={props.position} disableAutoPosition={props.disableAutoPosition} overlayReference={props.tooltipReference}>
            <div className={`tooltip ${props.theme || "default"} ${props.show ? "show" : ""}`} role="tooltip">
                <div className="tooltip-arrow" />
                <div className="tooltip-inner">
                    {/* TODO: remove when attribute is removed */}
                    {props.content ? props.content : props.messageGroup ? <TooltipMessageGroup {...props} /> : <TooltipMessage {...props} />}
                </div>
            </div>
        </Overlay>
    );
});
// TODO: remove when attribute is removed
type TooltipMessage = Pick<TooltipProps, "title" | "message" | "width">;
const TooltipMessage: React.FC<TooltipMessage> = (props: TooltipMessage) => {
    return (
        <div className="message-container" style={{ width: `${props.width || 120}px` }}>
            {props.title && <div className="title">{props.title}</div>}
            <div className="message">{props.message || "Tooltip is empty. Please pass a message."}</div>
        </div>
    );
};
type TooltipMessageGroup = Pick<TooltipProps, "messageGroup" | "width">;
const TooltipMessageGroup: React.FC<TooltipMessageGroup> = (props: TooltipMessageGroup) => {
    return (
        <div className="message-container" style={{ width: `${props.width || 120}px` }}>
            {props.messageGroup.map((item, index) => (
                <div key={index} className="message-list-item">
                    {item.title && <div className="title">{item.title}</div>}
                    {item.message && <div className="message">{item.message}</div>}
                </div>
            ))}
        </div>
    );
};
