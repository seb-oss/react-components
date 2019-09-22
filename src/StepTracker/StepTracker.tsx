import * as React from "react";
import "./step-tracker-style.scss";

const checkIcon: JSX.Element = <svg name="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z" /></svg>;

export type StepTrackerLabelPosition = "right" | "left" | "bottom" | "top";
export type StepTrackerLabelOrientation = "horizontal" | "vertical";

export interface StepTrackerProps {
    className?: string;
    id?: string;
    labelPosition?: StepTrackerLabelPosition;
    list: Array<string>;
    onClick?: (index: number) => void;
    orientation?: StepTrackerLabelOrientation;
    step: number;
    useNumbers?: boolean;
}

export const StepTracker: React.FunctionComponent<StepTrackerProps> = React.memo((props: StepTrackerProps): React.ReactElement<void> => {
    let topLabel: boolean;
    let bottomLabel: boolean;
    let rightLabel: boolean;
    let leftLabel: boolean;
    let orientation: string;
    let labelPosition: string;

    if (["horizontal", "vertical"].indexOf(props.orientation) === -1) {
        orientation = "horizontal";
    } else {
        orientation = props.orientation;
    }
    if (orientation === "horizontal") {
        if (["top", "bottom"].indexOf(props.labelPosition) === -1) {
            labelPosition = "bottom";
        } else {
            labelPosition = props.labelPosition;
        }
        if (labelPosition === "top") {
            topLabel = true;
            bottomLabel = false;
            rightLabel = false;
            leftLabel = false;
        }
        if (labelPosition === "bottom") {
            topLabel = false;
            bottomLabel = true;
            rightLabel = false;
            leftLabel = false;
        }
    }
    if (orientation === "vertical") {
        if (["left", "right"].indexOf(props.labelPosition) === -1) {
            labelPosition = "right";
        } else {
            labelPosition = props.labelPosition;
        }
        if (labelPosition === "left") {
            topLabel = false;
            bottomLabel = false;
            rightLabel = false;
            leftLabel = true;
        }
        if (labelPosition === "right") {
            topLabel = false;
            bottomLabel = false;
            rightLabel = true;
            leftLabel = false;
        }
    }

    let wrapperClass: string = "custom-step-tracker";
    if (props.onClick) { wrapperClass += " clickable"; }
    wrapperClass += ` ${orientation}`;
    wrapperClass += ` label-${labelPosition}`;
    if (props.className) { wrapperClass += ` ${props.className}`; }

    function getProgress(pos: number): string {
        return (100 / (props.list.length - 1)) * pos + "%";
    }

    return (
        <div className={wrapperClass} id={props.id}>

            {topLabel &&
                <div className="text-wrapper">
                    {props.list.map((item: string, i: number) =>
                        <div
                            className={"text" + (props.step === i ? " active" : "")}
                            style={{ width: getProgress(1) }}
                            key={i}
                        >
                            <div className="name">{item}</div>
                        </div>
                    )}
                </div>
            }

            {leftLabel &&
                <div className="text-wrapper">
                    {props.list.map((item: string, i: number) =>
                        <div className={"text" + (props.step === i ? " active" : "")} key={i}>
                            <div className="name">{item}</div>
                        </div>
                    )}
                </div>
            }

            {(orientation === "horizontal") &&
                <div className="step-wrapper">
                    <div className="line">
                        <div className="progress" style={{ width: getProgress(props.step) }} />
                    </div>
                    {props.list.map((item: string, i: number) =>
                        <div
                            className={"step" + (props.step === i ? " active" : "") + (props.useNumbers ? " numbered" : "")}
                            style={{ left: getProgress(i) }}
                            onClick={() => props.onClick && props.onClick(i)}
                            key={i}
                        >
                            <div className="step-border" />
                            {checkIcon}
                            <div className="number">{i + 1}</div>
                        </div>
                    )}
                </div>
            }

            {(orientation === "vertical") &&
                <div className="step-wrapper">
                    <div className="line">
                        <div className="progress" style={{ height: getProgress(props.step) }} />
                    </div>
                    {props.list.map((item: string, i: number) =>
                        <div
                            className={"step" + (props.step === i ? " active" : "") + (props.useNumbers ? " numbered" : "")}
                            style={{ top: getProgress(i) }}
                            onClick={() => props.onClick && props.onClick(i)}
                            key={i}
                        >
                            <div className="step-border" />
                            {checkIcon}
                            <div className="number">{i + 1}</div>
                        </div>
                    )}
                </div>
            }

            {bottomLabel &&
                <div className="text-wrapper">
                    {props.list.map((item: string, i: number) =>
                        <div
                            className={"text" + (props.step === i ? " active" : "")}
                            style={{ width: getProgress(1) }}
                            key={i}
                        >
                            <div className="name">{item}</div>
                        </div>
                    )}
                </div>
            }

            {rightLabel &&
                <div className="text-wrapper">
                    {props.list.map((item: string, i: number) =>
                        <div
                            className={"text" + (props.step === i ? " active" : "")}
                            key={i}
                        >
                            <div className="name">{item}</div>
                        </div>
                    )}
                </div>
            }

        </div>
    );
});
