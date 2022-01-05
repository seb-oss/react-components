import React from "react";
import classnames from "classnames";
import "./timeline-item.scss";

export type TimelineItemProps = JSX.IntrinsicElements["li"] & {
    /** The header of the timeline item */
    header: React.ReactNode;
    /** The time this item occured. Example (January 2019) */
    time: string;
};

export const TimelineItem: React.FC<TimelineItemProps> = React.memo(
    React.forwardRef(({ header, time, ...props }: TimelineItemProps, ref: React.ForwardedRef<HTMLLIElement>) => (
        <li {...props} ref={ref} className={classnames("rc", "timeline-item", { clickable: props.onClick }, props.className)} tabIndex={0}>
            <div className="content-wrapper">
                <div className="title">{header}</div>
                <div className="time-wrapper">
                    <time className="time" dateTime={time}>
                        {time}
                    </time>
                </div>
                {!!props.children && <div className="desc">{props.children}</div>}
            </div>
        </li>
    ))
);
