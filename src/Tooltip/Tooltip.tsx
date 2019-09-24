import * as React from "react";
import "./tooltip-style.scss";

const InfoCircleIcon: JSX.Element = <svg name="info-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-36 344h12V232h-12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h48c6.627 0 12 5.373 12 12v140h12c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12zm36-240c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z" /></svg>;

export interface TooltipMessageGroupItem {
    title?: string;
    message: string;
}

interface TooltipState {
    toggle: boolean;
}

export interface TooltipProps {
    className?: string;
    customSvg?: any;
    message?: string;
    messageGroup?: Array<TooltipMessageGroupItem>;
    onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
    position?: string;
    theme?: string;
    title?: string;
    triggerOnHover?: boolean;
    width?: number;

}

export class Tooltip extends React.Component<TooltipProps, TooltipState> {
    constructor(props: TooltipProps) {
        super(props);

        this.state = {
            toggle: false
        };

        this.forceDismiss = this.forceDismiss.bind(this);
        this.toggleTooltip = this.toggleTooltip.bind(this);
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
                default: this.setState({ toggle: false });
            }
        } else {
            this.setState({ toggle: false });
        }
    }

    /** Forces the tooltip to show */
    forceShow() {
        !this.state.toggle && this.setState({ toggle: true });
    }

    isPositioned(search: string): boolean {
        const position: string = this.props.position ? this.props.position : "bottom";
        return position.search(search) === 0;
    }

    toggleTooltip(state?: boolean, e?: React.MouseEvent<HTMLDivElement>) {
        if (state !== undefined) {
            this.setState({ toggle: state });
        } else {
            this.setState({ toggle: !this.state.toggle });
        }

        this.props.onClick && this.props.onClick(e);
    }

    render() {
        return (
            <div className={"tooltip-container" + (this.props.className ? ` ${this.props.className}` : "")}>
                <div
                    className="icon"
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => !this.props.triggerOnHover && this.toggleTooltip(undefined, e)}
                    onMouseEnter={() => this.props.triggerOnHover && this.toggleTooltip(true)}
                    onMouseLeave={() => this.props.triggerOnHover && this.toggleTooltip(false)}
                >
                    {this.props.customSvg ? this.props.customSvg : InfoCircleIcon}
                </div>
                <div className={`content ${this.props.position || "bottom"} ${this.props.theme || "default"} ${this.state.toggle ? "open" : ""}`}>
                    {this.isPositioned("bottom") && <div className="triangle" />}

                    {!this.props.messageGroup &&
                        <div className="message-container" style={{ width: `${this.props.width || 120}px` }}>
                            {this.props.title && <div className="title">{this.props.title}</div>}
                            <div className="message">{this.props.message || "Tooltip is empty. Please pass a message."}</div>
                        </div>
                    }

                    {this.props.messageGroup &&
                        <div className="message-container" style={{ width: `${this.props.width || 120}px` }}>
                            {this.props.messageGroup.map((item, index) =>
                                <div key={index} className="message-list-item">
                                    {item.title && <div className="title">{item.title}</div>}
                                    {item.message && <div className="message">{item.message}</div>}
                                </div>
                            )}
                        </div>
                    }

                    {(this.isPositioned("top") || this.isPositioned("right") || this.isPositioned("left")) && <div className="triangle" />}
                </div>
            </div>
        );
    }
}
