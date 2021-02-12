import React from "react";
import classnames from "classnames";
import { StepLabelProps, StepLabel } from "./StepLabel";
import "./steptracker.scss";

const checkIcon: JSX.Element = (
    <svg name="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z" />
    </svg>
);

export type StepTrackerLabelPosition = "right" | "left" | "bottom" | "top";
export type StepTrackerLabelOrientation = "horizontal" | "vertical";

type SharedProps = JSX.IntrinsicElements["div"] & {
    /** Position of label in step tracker */
    labelPosition?: StepTrackerLabelPosition;
    /** Callback when step tracker item clicked */
    onStepClicked?: (index: number) => void;
    /** To display step tracker vertically or horizontally */
    orientation?: StepTrackerLabelOrientation;
    /** Current/ active step */
    value?: number;
    /** Use numbers for each step */
    useNumbers?: boolean;
};

interface VerticalStepTrackerProps extends SharedProps {
    /** Position of label in step tracker */
    labelPosition?: "right" | "left";
    /** To display step tracker vertically or horizontally */
    orientation?: "vertical";
}
interface HorizontalStepTrackerProps extends SharedProps {
    /** Position of label in step tracker */
    labelPosition?: "bottom" | "top";
    /** To display step tracker vertically or horizontally */
    orientation?: "horizontal";
}

export type StepTrackerProps = VerticalStepTrackerProps | HorizontalStepTrackerProps;

/** Step trackers illustrate the steps in a multi step process */
const StepTracker = ({ labelPosition, onStepClicked, orientation = "horizontal", value, useNumbers, ...props }: StepTrackerProps) => {
    const [isVertical, setIsVertical] = React.useState<boolean>(orientation === "vertical");

    const getStyles = (key: keyof React.CSSProperties, pos: number) => ({ [key]: (100 / (React.Children.count(props.children) - 1)) * pos + "%" });

    React.useEffect(() => {
        setIsVertical(orientation === "vertical");
    }, [orientation]);

    return (
        <div {...props} className={classnames("rc step-tracker", orientation, labelPosition || (orientation === "horizontal" ? "bottom" : "right"), { clickable: onStepClicked }, props.className)}>
            <div className="step-wrapper">
                <div className="line">
                    <div className="progress" style={getStyles(isVertical ? "height" : "width", value)} />
                </div>
                {React.Children.map(props.children, (_, i: number) => (
                    <div
                        className={"step" + (value === i ? " active" : "") + (useNumbers ? " numbered" : "")}
                        style={getStyles(isVertical ? "top" : "left", i)}
                        onClick={() => onStepClicked && onStepClicked(i)}
                        key={i}
                    >
                        <div className="step-border" />
                        {checkIcon}
                        <div className="number">{i + 1}</div>
                    </div>
                ))}
            </div>
            <div className="text-wrapper">
                {React.Children.map(props.children, (Child: React.ReactElement<StepLabelProps>, i: number) =>
                    React.isValidElement<React.FC<StepLabelProps>>(Child)
                        ? React.cloneElement<any>(Child, {
                              isActive: value === i,
                              style: isVertical ? null : getStyles("width", 1),
                          })
                        : Child
                )}
            </div>
        </div>
    );
};

StepTracker.Label = StepLabel;

export { StepTracker };
