import React from "react";
import classnames from "classnames";
import { StepProps } from "./Step";
import "./steptracker.scss";

const checkIcon: JSX.Element = (
    <svg name="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z" />
    </svg>
);

export type StepTrackerLabelPosition = "right" | "left" | "bottom" | "top";
export type StepTrackerLabelOrientation = "horizontal" | "vertical";

type StepTrackerCommonProps = Omit<JSX.IntrinsicElements["div"], "onChange"> & {
    /** callback when step tracker item clicked */
    onChange?: (index: number) => void;
    /** Current/ active step */
    value?: number;
    /** Use numbers for each step */
    useNumbers?: boolean;
};

interface StepTrackerVertical extends StepTrackerCommonProps {
    /** To display step tracker vertically or horizontally */
    orientation?: "vertical";
    /** Position of label in step tracker */
    labelPosition?: "right" | "left";
}

interface StepTrackerHorizontal extends StepTrackerCommonProps {
    /** To display step tracker vertically or horizontally */
    orientation?: "horizontal";
    /** Position of label in step tracker */
    labelPosition?: "bottom" | "top";
}

export type StepTrackerProps = StepTrackerVertical | StepTrackerHorizontal;
/** Step trackers illustrate the steps in a multi step process */
export const StepTracker: React.FC<StepTrackerProps> = React.memo(({ labelPosition = "bottom", onChange, orientation = "horizontal", value, useNumbers, ...props }: StepTrackerProps) => {
    const [isVertical, setIsVertical] = React.useState<boolean>(orientation === "vertical");
    const [stepList, setStepList] = React.useState<Array<number>>([]);

    const getProgress = React.useCallback((pos: number): string => (100 / (stepList.length - 1)) * pos + "%", [stepList]);
    const getStyles = React.useCallback((key: keyof React.CSSProperties, pos: number): React.CSSProperties => ({ [key]: getProgress(pos) }), [getProgress]);

    React.useEffect(() => setIsVertical(orientation === "vertical"), [orientation]);
    React.useEffect(() => setStepList(React.Children.toArray(props.children).map((value: null, i: number) => i)), [props.children]);

    return (
        <div className={classnames("rc step-tracker", orientation, labelPosition, props.className, { clickable: onChange })} {...props}>
            <div className="step-wrapper">
                <div className="line">
                    <div className="progress" style={getStyles(isVertical ? "height" : "width", value)} />
                </div>
                {stepList.map((i: number) => (
                    <div
                        className={"step" + (value === i ? " active" : "") + (useNumbers ? " numbered" : "")}
                        style={getStyles(isVertical ? "top" : "left", i)}
                        onClick={() => onChange && onChange(i)}
                        key={i}
                    >
                        <div className="step-border" />
                        {checkIcon}
                        <div className="number">{i + 1}</div>
                    </div>
                ))}
            </div>
            <div className="text-wrapper">
                {React.Children.map(props.children, (Child: React.ReactElement<StepProps>, i: number) =>
                    React.isValidElement<React.FC<StepProps>>(Child)
                        ? React.cloneElement<any>(Child, {
                              active: value === i,
                              style: isVertical ? null : getStyles("width", 1),
                          })
                        : Child
                )}
            </div>
        </div>
    );
});
