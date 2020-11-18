import React from "react";
import classnames from "classnames";
import "./step-tracker-style.scss";
import StepLabel, { StepLabelProps } from "./StepLabel";
import { AccordionItem, AccordionItemProps } from "../Accordion";

const checkIcon: JSX.Element = (
    <svg name="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z" />
    </svg>
);

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
export const StepTracker: React.FC<StepTrackerProps> = React.memo(({ labelPosition = "bottom", list, onClick, orientation = "horizontal", step, useNumbers, ...props }: StepTrackerProps) => {
    const [isVertical, setIsVertical] = React.useState<boolean>(orientation === "vertical");
    const [stepList, setStepList] = React.useState<Array<number>>([]);

    const getProgress = React.useCallback(
        (pos: number): string => {
            return (100 / (stepList.length - 1)) * pos + "%";
        },
        [stepList]
    );

    const getStyles = React.useCallback(
        (key: keyof React.CSSProperties, pos: number): React.CSSProperties => {
            return { [key]: getProgress(pos) };
        },
        [getProgress]
    );

    React.useEffect(() => {
        setIsVertical(orientation === "vertical");
    }, [orientation]);

    React.useEffect(() => {
        setStepList((list ? list : React.Children.toArray(props.children)).map((value: null, i: number) => i));
    }, [props.children, list]);

    return (
        <div className={classnames("rc step-tracker", orientation, labelPosition, props.className, { clickable: onClick })} {...props}>
            <div className="step-wrapper">
                <div className="line">
                    <div className="progress" style={getStyles(isVertical ? "height" : "width", step)} />
                </div>
                {stepList.map((i: number) => (
                    <div
                        className={"step" + (step === i ? " active" : "") + (useNumbers ? " numbered" : "")}
                        style={getStyles(isVertical ? "top" : "left", i)}
                        onClick={() => onClick && onClick(i)}
                        key={i}
                    >
                        <div className="step-border" />
                        {checkIcon}
                        <div className="number">{i + 1}</div>
                    </div>
                ))}
            </div>
            <div className="text-wrapper">
                {list?.map((item: StepLabelProps, i: number) => (
                    <StepLabel key={i} isActive={step === i} style={isVertical ? null : getStyles("width", 1)} {...item} />
                ))}
                {React.Children.map(props.children, (Child: React.ReactElement<StepLabelProps>, i: number) =>
                    React.isValidElement<React.FC<StepLabelProps>>(Child)
                        ? React.cloneElement<any>(Child, {
                              isActive: step === i,
                              style: isVertical ? null : getStyles("width", 1),
                          })
                        : Child
                )}
            </div>
        </div>
    );
});
