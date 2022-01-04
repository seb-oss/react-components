import React from "react";
import classnames from "classnames";
import { TimelineItemProps } from ".";
import "./timeline.scss";

export type TimelineDirection = "vertical" | "horizontal";

export type TimelineProps = JSX.IntrinsicElements["ol"] & {
    /** Timeline direction: `vertical` | `horizontal`. Default is `vertical` */
    direction?: TimelineDirection;
};

const GridPlaceholder = <div className="timeline-placeholder" />;

/** A component where a list of events is displayed chronologically. */
export const Timeline: React.FunctionComponent<TimelineProps> = React.memo(
    React.forwardRef(({ direction = "vertical", ...props }: TimelineProps, ref: React.ForwardedRef<HTMLOListElement>) => (
        <ol {...props} ref={ref} className={classnames("rc", "timeline", direction, props.className)}>
            {props.children && <aside className="timeline-bar" />}
            {React.Children.map(props.children, (Child: React.ReactElement<TimelineItemProps>, index: number) =>
                React.isValidElement(Child) ? (index % 2 ? [GridPlaceholder, Child] : [Child, GridPlaceholder]) : null
            )}
        </ol>
    ))
);
