import React from "react";
import classnames from "classnames";
import { StepLabel, StepLabelProps } from "./StepLabel";
import "./steptracker.scss";

export type StepTrackerLabelPosition = "right" | "left" | "bottom" | "top";
export type StepTrackerLabelOrientation = "horizontal" | "vertical";

export type StepTrackerProps = Omit<JSX.IntrinsicElements["div"], "onClick"> & {
    /** Position of label in step tracker */
    labelPosition?: StepTrackerLabelPosition;
    /** list of item in step tracker */
    list?: Array<StepLabelProps>;
    /** callback when step tracker item clicked */
    onClick?: (index: number) => void;
    /** To display step tracker vertically or horizontally */
    orientation?: StepTrackerLabelOrientation;
    /** Current/ active step */
    step: number;
    /** Use numbers for each step */
    useNumbers?: boolean;
};
/** Step trackers illustrate the steps in a multi step process */
export const StepTracker: React.FC<StepTrackerProps> = React.memo(
    React.forwardRef(({ labelPosition = "bottom", list, onClick, orientation = "horizontal", step, useNumbers, ...props }: StepTrackerProps, ref: React.ForwardedRef<HTMLDivElement>) => {
        const [isVertical, setIsVertical] = React.useState<boolean>(orientation === "vertical");

        const getLabelProps = (index: number): Partial<StepLabelProps> => ({
            isActive: step === index,
            isCompleted: index < step,
            isNumbered: useNumbers,
            count: index + 1,
            className: `step-label--${getLabelPositionClass()}`,
            onClick: () => onClick && onClick(index),
        });

        const getLabelPositionClass = () => {
            if (isVertical) {
                return labelPosition === "left" ? "left" : "right";
            }
            return labelPosition === "top" ? "top" : "bottom";
        };

        React.useEffect(() => {
            setIsVertical(orientation === "vertical");
        }, [orientation]);

        return (
            <div {...props} ref={ref} className={classnames("rc step-tracker", `step-tracker--${orientation}`, props.className, { clickable: onClick })}>
                <ol className="step-wrapper">
                    {list?.map((item: StepLabelProps, i: number) => (
                        <StepLabel key={i} {...getLabelProps(i)} {...item} />
                    ))}
                    {React.Children.map(props.children, (Child: React.ReactElement<StepLabelProps>, i: number) => {
                        const newProps: Partial<StepLabelProps> = getLabelProps(i);
                        return React.isValidElement<React.FC<StepLabelProps>>(Child)
                            ? React.cloneElement<any>(Child, {
                                  ...newProps,
                                  className: classnames(Child.props.className, newProps.className),
                              })
                            : Child;
                    })}
                </ol>
            </div>
        );
    })
);
