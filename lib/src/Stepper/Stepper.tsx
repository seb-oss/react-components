import React from "react";
import { randomId } from "@sebgroup/frontend-tools";
import "./stepper-style.scss";

export interface StepperProps {
    /** Element class name */
    className?: string;
    /** Property sets whether textbox is disabled */
    disabled?: boolean;
    /** Error message */
    error?: string;
    /** Element ID */
    id?: string;
    /** Element label */
    label?: string;
    /** Maximum value of the range */
    max: number;
    /** Minimum value of the range */
    min: number;
    /** Element name */
    name?: string;
    /** callback when element value is decreased */
    onDecrease: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** callback when element value is increased */
    onIncrease: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Component associates with input ref */
    reference?: React.RefObject<any>;
    /** Element value */
    value: number;
    /** Warning message */
    warning?: string;
}

/** A stepper makes it easier to input values that are in a narrow range */
export const Stepper: React.FC<StepperProps> = (props: StepperProps) => {
    const [id, setId] = React.useState<string>("");
    React.useEffect(() => {
        setId(props.id ? props.id : randomId("stepper-"));
    }, [props.id]);
    return (
        <div className={"form-group custom-stepper" + (props.className ? ` ${props.className}` : "")}>
            {props.label && <label className="custom-label">{props.label}</label>}
            <div className={"stepper-container" + (props.disabled ? " disabled" : "")}>
                <button
                    className={"stepper-decrement" + (props.value === props.min ? " disabled" : "")}
                    onClick={props.value > props.min && !props.disabled ? props.onDecrease : null}
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
                    onClick={props.value < props.max && !props.disabled ? props.onIncrease : null}
                    aria-controls={id}
                    aria-labelledby="increment"
                >
                    <span>&#43;</span>
                </button>
            </div>
            <input
                className="stepper-input"
                id={id}
                name={props.name}
                value={props.value}
                type="number"
                min={props.min}
                max={props.max}
                readOnly={true}
                disabled={props.disabled}
                ref={props.reference}
                aria-live="assertive"
            />
            {props.warning && !props.error && <div className="alert alert-warning">{props.warning}</div>}
            {props.error && <div className="alert alert-danger">{props.error}</div>}
        </div>
    );
};
