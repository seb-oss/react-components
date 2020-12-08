import * as React from "react";
import classnames from "classnames";
import "./timeline-style.scss";
import TimelineItem, { HorizontalTimelineItemPosition, TimelineDirection, TimelineItemProps, VerticalTimelineItemPosition } from "./TimelineItem";

export type TimelineProps = Omit<JSX.IntrinsicElements["div"], "onClick"> & {
    /** Timeline direction: `vertical` | `horizontal` */
    direction?: TimelineDirection;
    /** list of timeline items */
    list?: Array<TimelineItemProps>;
    /** callback when each timeline item clicked */
    onClick?: (index: number) => void;
};

/** A component where a list of events is displayed chronologically. */
export const Timeline: React.FunctionComponent<TimelineProps> = React.memo(
    ({ direction = "vertical", list, onClick, ...props }: TimelineProps): React.ReactElement<void> => {
        const positionArray: Array<VerticalTimelineItemPosition | HorizontalTimelineItemPosition> = React.useMemo(() => (direction === "vertical" ? ["left", "right"] : ["bottom", "top"]), [
            direction,
        ]);
        return (
            <div className={classnames("timeline", direction, props.className, { clickable: onClick })} {...props}>
                {list?.map(
                    (item: TimelineItemProps, i: number) =>
                        item && (
                            <TimelineItem
                                key={i}
                                {...item}
                                direction={direction}
                                position={item.position || positionArray[i % 2]}
                                wrapperProps={{ ...item.wrapperProps, style: direction === "horizontal" ? { width: 100 / list.length + "%" } : null }}
                                onClick={() => {
                                    onClick && onClick(i);
                                }}
                            />
                        )
                )}
                {React.Children.map(props.children, (Child: React.ReactElement<TimelineItemProps>, index: number) => {
                    return React.isValidElement<React.FC<TimelineItemProps>>(Child)
                        ? React.cloneElement<any>(Child, {
                              direction,
                              position: Child.props.position || positionArray[index % 2],
                              wrapperProps: { ...Child.props.wrapperProps, style: direction === "horizontal" ? { width: 100 / React.Children.toArray(props.children).length + "%" } : null },
                              onClick: () => {
                                  onClick && onClick(index);
                              },
                          })
                        : Child;
                })}
            </div>
        );
    }
);
