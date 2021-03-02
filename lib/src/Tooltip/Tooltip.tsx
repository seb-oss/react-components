import React, { Children } from "react";
import { ElementPosition } from "./placement";
import { randomId } from "@sebgroup/frontend-tools";
import { Overlay } from "./Overlay";
import classnames from "classnames";
import "./tooltip.scss";

const InfoCircleIcon: JSX.Element = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm16 400c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h352c8.822 0 16 7.178 16 16v352zm-192-92c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm7.67-24h-16c-6.627 0-12-5.373-12-12v-.381c0-70.343 77.44-63.619 77.44-107.408 0-20.016-17.761-40.211-57.44-40.211-29.144 0-44.265 9.649-59.211 28.692-3.908 4.98-11.054 5.995-16.248 2.376l-13.134-9.15c-5.625-3.919-6.86-11.771-2.645-17.177C153.658 133.514 178.842 116 223.67 116c52.32 0 97.44 29.751 97.44 80.211 0 67.414-77.44 63.849-77.44 107.408V304c0 6.627-5.373 12-12 12z" />
    </svg>
);

export type TooltipTrigger = "hover" | "click" | "focus";
export type TooltipTheme = "default" | "light" | "primary" | "warning" | "success" | "danger" | "purple";
export type TooltipPosition = ElementPosition;

export type TooltipProps = Omit<JSX.IntrinsicElements["div"], "ref"> & {
    /** Css style positions: top/bottom/left/right */
    position?: TooltipPosition;
    /** Based on SEB predefined colors */
    theme?: TooltipTheme;
    /** Tooltip content */
    content?: string | React.ReactNode;
    /** Tooltip trigger mode */
    trigger?: TooltipTrigger;
    /** Force tooltip to be at certain position */
    disableAutoPosition?: boolean;
    /** callback on tooltip visibility status change */
    onVisibleChange?: (event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLElement> | React.TouchEvent<HTMLDivElement>, visible: boolean) => void;
    /** tooltip content wrapper props */
    tooltipWrapperProps?: JSX.IntrinsicElements["div"];
};
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
        this.props.trigger === "hover" && this.onTooltipToggle(e, toggleOn);
    };

    onClickEvent = (e: React.MouseEvent<HTMLDivElement>) => {
        (!this.props.trigger || this.props.trigger === "click") && this.onTooltipToggle(e);
    };

    onMouseEnterEvent = (e: React.MouseEvent<HTMLDivElement>) => this.onHover(e, true);
    onMouseLeaveEvent = (e: React.MouseEvent<HTMLDivElement>) => this.onHover(e, false);
    onTouchStartEvent = (e: React.TouchEvent<HTMLDivElement>) => this.onHover(e, true);
    onTouchEndEvent = (e: React.TouchEvent<HTMLDivElement>) => this.onHover(e, false);
    onFocusEvent = (e: React.FocusEvent<HTMLDivElement>) => this.props.trigger === "focus" && this.onTooltipToggle(e, true);

    render() {
        const { position, theme, content, trigger, disableAutoPosition, onVisibleChange, tooltipWrapperProps, className, ...props } = this.props;
        return (
            <div className={classnames("tooltip-container", className)} {...props}>
                <div
                    id={this.state.referenceId}
                    ref={this.containerRef}
                    className={classnames("tooltip-reference", { cursor: this.props.trigger === "click" })}
                    tabIndex={-1}
                    onClick={this.onClickEvent}
                    onMouseEnter={this.onMouseEnterEvent}
                    onMouseLeave={this.onMouseLeaveEvent}
                    onTouchStart={this.onTouchStartEvent}
                    onTouchEnd={this.onTouchEndEvent}
                    onFocus={this.onFocusEvent}
                >
                    {this.props.children ? (
                        React.Children.count(this.props.children) === 1 ? (
                            React.Children.map(this.props.children, (Child: React.ReactElement) => {
                                return Object(Child) !== Child ? <span className="text-help">{Child}</span> : Child;
                            })
                        ) : (
                            this.props.children
                        )
                    ) : (
                        <div className="default-content">{InfoCircleIcon}</div>
                    )}
                </div>
                <TooltipContentContainer
                    {...tooltipWrapperProps}
                    position={position}
                    theme={theme}
                    content={content}
                    disableAutoPosition={disableAutoPosition}
                    ref={this.contentRef}
                    onContentBlur={this.onTooltipContentBlur}
                    show={this.state.visible}
                    tooltipReference={() => this.containerRef.current}
                />
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
            }
        );
    };
}

type TooltipContentContainerProps = JSX.IntrinsicElements["div"] &
    Pick<TooltipProps, "theme" | "position" | "content" | "disableAutoPosition"> & {
        show: boolean;
        tooltipReference: () => HTMLDivElement;
        onContentBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
    };
const TooltipContentContainer: React.FC<TooltipContentContainerProps> = React.forwardRef(
    ({ show, tooltipReference, onContentBlur, theme = "default", position, content, disableAutoPosition, ...props }: TooltipContentContainerProps, forwardedRef: React.RefObject<HTMLDivElement>) => {
        return (
            <Overlay ref={forwardedRef} show={show} onBlur={onContentBlur} position={position} disableAutoPosition={disableAutoPosition} overlayReference={tooltipReference}>
                <div className={classnames(`tooltip`, theme, { show: show }, props.className)} role="tooltip" {...props}>
                    <div className="tooltip-arrow" />
                    <div className="tooltip-inner">{content}</div>
                </div>
            </Overlay>
        );
    }
);
