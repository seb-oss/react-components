import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools";
import { FeedbackIndicator, Indicator } from "../FeedbackIndicator";
import "./stepper.scss";

export type StepperProps = Omit<JSX.IntrinsicElements["input"], "value" | "onChange"> & {
    /** Element label */
    label?: string;
    /** Stepper value */
    value?: number;
    /** Event fired when stepper is changed */
    onChange?: (value: number) => void;
    /** Feedback indicator */
    indicator?: Indicator;
    /** Props for the wrapper element (div) */
    wrapperProps?: JSX.IntrinsicElements["div"];
};

/** A stepper makes it easier to input values that are in a narrow range */
export const Stepper: React.FC<StepperProps> = ({ label, onChange, indicator, wrapperProps = {}, ...props }: StepperProps) => {
    const [id, setId] = React.useState<string>("");

    React.useEffect(() => setId(props.id ? props.id : randomId("stepper-")), [props.id]);

    return (
        <div {...wrapperProps} className={classnames("rc stepper", wrapperProps.className)}>
            {label && <label className="custom-label">{label}</label>}
            <FeedbackIndicator {...indicator}>
                <div className={"stepper-container" + (props.disabled ? " disabled" : "")}>
                    <button
                        className="btn"
                        onClick={() => props.value > props.min && !props.disabled && onChange && onChange(props.value - 1)}
                        aria-controls={id}
                        aria-labelledby="decrement"
                        disabled={props.disabled || props.value === props.min}
                    >
                        <span>&#8722;</span>
                    </button>
                    <div className="stepper-preview">
                        <span>{props.value}</span>
                    </div>
                    <button
                        className="btn"
                        onClick={() => props.value < props.max && !props.disabled && onChange && onChange(props.value + 1)}
                        aria-controls={id}
                        aria-labelledby="increment"
                        disabled={props.disabled || props.value === props.max}
                    >
                        <span>&#43;</span>
                    </button>
                </div>
            </FeedbackIndicator>
            <input {...props} id={id} type="number" readOnly className={classnames("stepper-input", props.className)} aria-live="assertive" />
        </div>
    );
};
