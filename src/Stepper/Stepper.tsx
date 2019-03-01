import * as React from "react";
import "./stepper-style.scss";

export interface StepperProps {
    value: number;
    onIncrease: (event: any) => void;
    onDecrease: (event: any) => void;
    min: number;
    max: number;
    name?: string;
    label?: string;
    className?: string;
    disabled?: boolean;
    error?: string;
    warning?: string;
    reference?: React.RefObject<any>;
}

export const Stepper: React.StatelessComponent<StepperProps> = (props: StepperProps): React.ReactElement<void> => {
    return (
        <div className={"form-group custom-stepper " + (props.className ? props.className : "")}>
            {props.label && <label className="custom-label">{props.label}</label>}
            <div className={"stepper-container " + (props.disabled ? "disabled" : "")}>
                <div className={"stepper-decrement " + (props.value === props.min ? "disabled" : "")} onClick={(props.value > props.min) ? props.onDecrease : null}>&#8722;</div>
                <div className="stepper-preview"><span>{props.value}</span></div>
                <div className={"stepper-increment " + (props.value === props.max ? "disabled" : "")} onClick={(props.value < props.max) ? props.onIncrease : null}>&#43;</div>
            </div>
            <input
                className="stepper-input"
                id={props.name}
                value={props.value}
                type="number"
                min={props.min}
                max={props.max}
                readOnly={true}
                disabled={props.disabled}
                ref={props.reference}
            />
            {(props.warning && !props.error) && <div className="alert alert-warning">{props.warning}</div>}
            {props.error && <div className="alert alert-danger">{props.error}</div>}
        </div>
    );
};
