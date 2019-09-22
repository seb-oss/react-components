import * as React from "react";
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
    onDecrease: (event: React.MouseEvent<HTMLDivElement>) => void;
    onIncrease: (event: React.MouseEvent<HTMLDivElement>) => void;
    reference?: React.RefObject<any>;
    value: number;
    warning?: string;
}

export const Stepper: React.FunctionComponent<StepperProps> = (props: StepperProps): React.ReactElement<void> => {
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
                id={props.id}
                name={props.name}
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
