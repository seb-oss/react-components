import * as React from "react";
import "./notification-style.scss";

type NotificationStyle = "slide-in" | "bar";
type NotificationPosition = "bottom-left" | "bottom-right" | "top-left" | "top-right" | "top" | "bottom";
type NotificationTheme = "purple" | "primary" | "danger" | "success" | "warning" | "inverted";

export interface NotificationAction {
    text: string;
    action: () => void;
}

export interface NotificationProps {
    actions?: Array<NotificationAction>;
    className?: string;
    dismissable?: boolean;
    dismissTimeout?: number;
    message?: string;
    onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
    onDismiss: () => void;
    persist?: boolean;
    position?: NotificationPosition;
    style?: NotificationStyle;
    theme?: NotificationTheme;
    title?: string;
    toggle: boolean;
}

const TimesIcon: JSX.Element = <svg name="times" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z" /></svg>;

export class Notification extends React.Component<NotificationProps> {
    timerRef: number = null;
    private defaultTimeout: number = 5000;

    constructor(props: NotificationProps) {
        super(props);
        this.dismiss = this.dismiss.bind(this);
    }

    componentDidMount(): void {
        if (this.props.toggle && !this.props.persist) {
            this.startTimer();
        }
    }

    componentDidUpdate(prevProps: NotificationProps): void {
        if (prevProps.toggle !== this.props.toggle) {
            if (this.props.toggle && !this.props.persist) {
                this.startTimer();
            } else {
                this.clearTimer();
            }
        }
    }

    componentWillUnmount(): void {
        this.clearTimer();
    }

    render(): React.ReactNode {
        const style: string = this.getStyleClass(this.props.style);
        return (
            <div
                className={
                    "custom-notification"
                    + ` ${style}`
                    + ` ${this.getThemeClass(this.props.theme)}`
                    + ` ${this.getPositionClass(this.props.position, this.props.style)}`
                    + (this.props.toggle ? " open" : "")
                    + (this.props.className ? ` ${this.props.className}` : "")}
            >
                <div
                    className={`content-wrapper` + (this.props.onClick ? " clickable" : "")}
                    onClick={this.props.onClick}
                >
                    {(this.props.title && style === "style-slide-in") && <div className="notification-title">{this.props.title}</div>}
                    {this.props.message && <div className="notification-message">{this.props.message}</div>}
                    {this.props.children && this.props.children}
                    {(style === "style-slide-in" && this.props.actions && this.props.actions.length && this.props.actions.length < 3) &&
                        <div className={"actions-wrapper" + (this.props.actions.length === 2 ? " partitioned" : "")}>
                            {this.props.actions.map((item: NotificationAction, i: number) =>
                                <div key={i} className="action-wrapper">
                                    <button className="btn btn-sm btn-secondary notification-action" onClick={item.action}>
                                        {item.text}
                                    </button>
                                </div>
                            )}
                        </div>
                    }
                </div>
                {this.props.dismissable &&
                    <div className="dismiss-btn" onClick={this.dismiss}>
                        {TimesIcon}
                    </div>
                }
            </div>
        );
    }

    /** Dismiss the notification */
    private dismiss(): void {
        this.clearTimer();
        this.props.onDismiss && this.props.onDismiss();
    }

    /** Start the timer to dismiss the notification */
    private startTimer(): void {
        this.clearTimer();
        this.timerRef = window.setTimeout(() => {
            this.dismiss();
        }, this.props.dismissTimeout || this.defaultTimeout);
    }

    /** Clear the timer that dismisses the notification */
    private clearTimer(): void {
        if (this.timerRef) {
            clearTimeout(this.timerRef);
            this.timerRef = null;
        }
    }

    /**
     * Get the style class based on the theme passed through the props
     * @param {string} style The style passed through the props
     * @returns {string} The style class
     */
    private getStyleClass(style: string): string {
        let styleClass: string = "style-";
        if (style && ["slide-in", "bar"].indexOf(style) !== -1) {
            styleClass += style;
        } else {
            styleClass += "slide-in";
        }
        return styleClass;
    }

    /**
     * Get the theme class based on the theme passed though the props
     * @param {string} theme The theme passed through the props
     * @returns {string} The theme class
     */
    private getThemeClass(theme: string): string {
        let themeClass: string = "theme-";
        if (theme && ["purple", "primary", "danger", "success", "warning", "inverted"].indexOf(theme) !== -1) {
            themeClass += theme;
        } else {
            themeClass += "purple";
        }
        return themeClass;
    }

    /**
     * Get the position class based on the position and style passed through the props
     * @param {string} position The position passed through the props
     * @param {string} style The style passed through the props
     * @returns {string} The position class
     */
    private getPositionClass(position: string, style: string): string {
        let positionClass: string;
        if (style && ["slide-in", "bar"].indexOf(style) !== -1) {
            switch (style) {
                case "slide-in":
                    if (position && ["bottom-left", "bottom-right", "top-left", "top-right"].indexOf(position) !== -1) {
                        positionClass = position;
                    } else {
                        positionClass = "bottom-left";
                    }
                    break;
                case "bar":
                    if (position && ["top", "bottom"].indexOf(position) !== -1) {
                        positionClass = position;
                    } else {
                        positionClass = "top";
                    }
                    break;
            }
        } else { // Should default back to `slide-in`
            if (position && ["bottom-left", "bottom-right", "top-left", "top-right"].indexOf(position) !== -1) {
                positionClass = position;
            } else {
                positionClass = "bottom-left";
            }
        }
        return positionClass;
    }
}
