import React from "react";
import classnames from "classnames";
import ResizeObserver from "resize-observer-polyfill";

export type VerticalTimelineItemPosition = "left" | "right";
export type HorizontalTimelineItemPosition = "top" | "bottom";
export type TimelineDirection = "vertical" | "horizontal";

export type TimelineItemProps = JSX.IntrinsicElements["div"] & {
    wrapperProps?: JSX.IntrinsicElements["div"];
    title: React.ReactNode;
    time: string;
    desc?: React.ReactNode;
    direction?: TimelineDirection;
    position?: VerticalTimelineItemPosition | HorizontalTimelineItemPosition;
};

const TimelineItem: React.FC<TimelineItemProps> = ({ wrapperProps, title, time, desc, direction = "vertical", position = "bottom", ...props }: TimelineItemProps) => {
    const ref = React.useRef<HTMLDivElement>();
    const [height, setHeight] = React.useState<number>(ref?.current?.offsetHeight);

    React.useEffect(() => {
        let observer;
        if (direction === "horizontal") {
            setHeight(ref?.current?.clientHeight);
            observer = new ResizeObserver(() => {
                setHeight(ref?.current?.clientHeight);
            });

            //start observing
            observer.observe(ref.current);
        } else {
            observer?.disconnect();
        }
        return () => {
            observer?.disconnect();
        };
    }, [ref, direction]);
    return (
        <div className={classnames("item-holder", position)} {...wrapperProps} ref={ref} style={direction === "horizontal" ? { marginTop: `${height}px`, ...(wrapperProps?.style || {}) } : null}>
            <div className={classnames({ [`direction-${position}`]: position })}>
                <div className="title-wrapper" {...props}>
                    <div className="title">{title}</div>
                    <div className="time-wrapper">
                        <span className="time">{time}</span>
                    </div>
                    {!!desc && <div className="desc">{desc}</div>}
                </div>
            </div>
        </div>
    );
};

export default TimelineItem;
