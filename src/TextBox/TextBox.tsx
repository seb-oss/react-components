import * as React from "react";
import "./text-box-style.scss";

export interface TextBoxProps {
    value: string | number;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    type?: string;
    label?: string;
    error?: string;
    placeHolder?: string;
    className?: string;
    focus?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    max?: number;
    autoComplete?: boolean;
    reference?: React.RefObject<HTMLInputElement>;
}

export const TextBox: React.FunctionComponent<TextBoxProps> = (props: TextBoxProps): React.ReactElement<void> => {
    return (
        <div className={"form-group input-box" + (props.className ? ` ${props.className}` : "")}>
            <div className={"input-field" + (props.error ? " has-error" : "")}>
                {props.label && <label className="custom-label" htmlFor={props.name}>{props.label}</label>}
                <input
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    onKeyDown={props.onKeyDown}
                    onKeyUp={props.onKeyUp}
                    onKeyPress={props.onKeyPress}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    placeholder={props.placeHolder}
                    className="form-control"
                    autoFocus={props.focus}
                    autoComplete={props.autoComplete ? "on" : "off"}
                    readOnly={props.readonly}
                    disabled={props.disabled}
                    maxLength={props.max}
                    ref={props.reference}
                />
                <div className="alert alert-danger">{props.error}</div>
            </div>
        </div>
    );
};
