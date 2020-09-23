import React from "react";
import { randomId } from "@sebgroup/frontend-tools";
import "./stepper-style.scss";

export interface StepperProps {
    className?: string;
    disabled?: boolean;
    error?: string;
    id?: string;
    label?: string;
    max: number;
    min: number;
    name?: string;
    onDecrease: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onIncrease: (event: React.MouseEvent<HTMLButtonElement>) => void;
    reference?: React.RefObject<any>;
    value: number;
    warning?: string;
}

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
