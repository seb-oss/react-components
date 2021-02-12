import React from "react";
import classnames from "classnames";
import { TimelineItemProps } from ".";
import { TimelineItem } from "./TimelineItem";
import "./timeline.scss";

export type TimelineDirection = "vertical" | "horizontal";

export type TimelineProps = JSX.IntrinsicElements["div"] & {
    /** Timeline direction: `vertical` | `horizontal`. Default is `vertical` */
    direction?: TimelineDirection;
};

const GridPlaceholder = <div className="timeline-placeholder" />;

/** A component where a list of events is displayed chronologically. */
const Timeline = ({ direction = "vertical", ...props }: TimelineProps) => (
    <div {...props} className={classnames("rc", "timeline", direction, props.className)}>
        {props.children && <aside className="timeline-bar" />}
        {React.Children.map(props.children, (Child: React.ReactElement<TimelineItemProps>, index: number) =>
            React.isValidElement(Child) ? (index % 2 ? [GridPlaceholder, Child] : [Child, GridPlaceholder]) : null
        )}
    </div>
);

Timeline.Item = TimelineItem;

export { Timeline };
