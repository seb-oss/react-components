import React from "react";
import classnames from "classnames";
import "./notification-style.scss";

type NotificationStyle = "slide-in" | "bar";
type NotificationPosition = "bottom-left" | "bottom-right" | "top-left" | "top-right" | "top" | "bottom";
type NotificationTheme = "purple" | "primary" | "danger" | "success" | "warning" | "inverted";

export interface NotificationAction {
    /** Action text */
    text: string;
    /** Callback when action button clicked */
    action: VoidFunction;
}

export type NotificationProps = Omit<JSX.IntrinsicElements["div"], "ref"> & {
    /** list of action buttons */
    actions?: Array<NotificationAction>;
    /** Property sets whether the notification is dismissable */
    dismissable?: boolean;
    /** Interval for the notification to be dismissed */
    dismissTimeout?: number;
    /** Notification content */
    message?: React.ReactNode;
    /** Callback when notification is dismissed */
    onDismiss: VoidFunction;
    /** Persist notification until dismissed (default: false) */
    persist?: boolean;
    /** Notification position, `bottom-left` | `bottom-right` | `top-left` | `top-right` | `top` | `bottom` */
    position?: NotificationPosition;
    /** Notification style, `slide-in` | `bar` */
    type?: NotificationStyle;
    /** Notification theme, `purple` | `primary` | `danger` | `success` | `warning` | `inverted` */
    theme?: NotificationTheme;
    /** Notification title */
    title?: string;
    /** Property sets whether the notification is toggled */
    toggle: boolean;
};

const TimesIcon: JSX.Element = (
    <svg name="times" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z" />
    </svg>
);
/** An alert which pops up on the page to inform the user of an event which occured and optionally provide actions to perform. */
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
        const {
            theme = "purple",
            type = "slide-in",
            position = "bottom-left",
            className,
            style,
            message,
            actions,
            id,
            title,
            persist,
            toggle,
            dismissable,
            onDismiss,
            dismissTimeout,
            ...props
        } = this.props;
        const availableTypes: Array<NotificationStyle> = ["bar", "slide-in"];
        return (
            <div
                className={classnames("rc custom-notification", className, position, {
                    open: toggle,
                    [`theme-${theme}`]: theme,
                    [`style-${type}`]: availableTypes.indexOf(type) > -1,
                    default: availableTypes.indexOf(type) === -1,
                })}
                style={style}
                id={id}
            >
                <div className={classnames(`content-wrapper`, { clickable: props.onClick })} {...props}>
                    {title && type === "slide-in" && <div className="notification-title">{title}</div>}
                    {message && <div className="notification-message">{message}</div>}
                    {props.children}
                    {type === "slide-in" && actions && actions.length && (
                        <div className={classnames("actions-wrapper", { partitioned: actions.length > 1 })}>
                            {actions.map((item: NotificationAction, i: number) => (
                                <div key={i} className="action-wrapper">
                                    <button className="btn btn-sm btn-secondary notification-action" onClick={item.action}>
                                        {item.text}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {dismissable && (
                    <div className="dismiss-btn" onClick={this.dismiss}>
                        {TimesIcon}
                    </div>
                )}
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
}
