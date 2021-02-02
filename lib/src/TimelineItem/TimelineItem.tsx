import React from "react";
import classnames from "classnames";
import "./timeline-item.scss";

export type TimelineItemProps = JSX.IntrinsicElements["div"] & {
    /** The header of the timeline item */
    header: React.ReactNode;
    /** The time this item occured. Example (January 2019) */
    time: string;
};

export const TimelineItem: React.FC<TimelineItemProps> = React.memo(({ header, time, ...props }: TimelineItemProps) => (
    <div {...props} className={classnames("rc", "timeline-item", { clickable: props.onClick }, props.className)}>
        <div className="content-wrapper">
            <div className="title">{header}</div>
            <div className="time-wrapper">
                <time className="time" dateTime={time}>
                    {time}
                </time>
            </div>
            {!!props.children && <div className="desc">{props.children}</div>}
        </div>
    </div>
));
