import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools";
import { FeedbackIndicator, Indicator, IndicatorType } from "../FeedbackIndicator";
import "./stepper.scss";

export type StepperProps = JSX.IntrinsicElements["input"] & {
    /** Element label */
    label?: string;
    /** callback when element value is decreased */
    onDecrease: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** callback when element value is increased */
    onIncrease: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Feedback indicator */
    indicator?: Indicator;
};

/** A stepper makes it easier to input values that are in a narrow range */
export const Stepper: React.FC<StepperProps> = ({ label, onDecrease, onIncrease, className, indicator, ...props }: StepperProps) => {
    const [id, setId] = React.useState<string>("");
    React.useEffect(() => {
        setId(props.id ? props.id : randomId("stepper-"));
    }, [props.id]);
    return (
        <FeedbackIndicator {...indicator} noBorder>
            <div className={classnames("form-group custom-stepper", className)}>
                {label && <label className="custom-label">{label}</label>}
                <div className={"stepper-container" + (props.disabled ? " disabled" : "")}>
                    <button
                        className={"stepper-decrement" + (props.value === props.min ? " disabled" : "")}
                        onClick={props.value > props.min && !props.disabled ? onDecrease : null}
                        aria-controls={id}
                        aria-labelledby="decrement"
                    >
                        <span>&#8722;</span>
                    </button>
                    <div className="stepper-preview">
                        <span>{props.value}</span>
                    </div>
                    <button
                        className={"stepper-increment" + (props.value === props.max ? " disabled" : "")}
                        onClick={props.value < props.max && !props.disabled ? onIncrease : null}
                        aria-controls={id}
                        aria-labelledby="increment"
                    >
                        <span>&#43;</span>
                    </button>
                </div>
                <input id={id} type="number" {...props} readOnly={true} className="stepper-input" aria-live="assertive" />
            </div>
        </FeedbackIndicator>
    );
};
