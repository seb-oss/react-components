import React from "react";
import classnames from "classnames";
import { HorizontalTimelineItemPosition, TimelineDirection, VerticalTimelineItemPosition } from ".";
import "./timeline.scss";
import { TimelineItemProps } from "./TimelineItem";

export type TimelineProps = JSX.IntrinsicElements["div"] & {
    /** Timeline direction: `vertical` | `horizontal`. Default is `vertical` */
    direction?: TimelineDirection;
};

const GridPlaceholder = <div className="timeline-placeholder" />;

/** A component where a list of events is displayed chronologically. */
export const Timeline: React.FunctionComponent<TimelineProps> = React.memo(({ direction = "vertical", ...props }: TimelineProps) => (
    <div {...props} className={classnames("rc", "timeline", direction, props.className)}>
        <aside className="timeline-bar" />
        {React.Children.map(props.children, (Child: React.ReactElement<TimelineItemProps>, index: number) =>
            React.isValidElement(Child) ? (index % 2 ? [GridPlaceholder, Child] : [Child, GridPlaceholder]) : null
        )}
    </div>
));
