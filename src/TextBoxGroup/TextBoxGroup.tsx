import * as React from "react";
import "./text-box-group-style.scss";

export interface TextBoxGroupProps {
    autoComplete?: boolean;
    className?: string;
    disabled?: boolean;
    error?: string;
    focus?: boolean;
    id?: string;
    label?: string;
    leftIcon?: any;
    leftText?: string;
    leftTitle?: string;
    maxLength?: number;
    minLength?: number;
    name: string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onLeftClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onRightClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    pattern?: string;
    placeHolder?: string;
    readonly?: boolean;
    reference?: React.RefObject<HTMLInputElement>;
    required?: boolean;
    rightIcon?: any;
    rightText?: string;
    rightTitle?: string;
    type?: string;
    value: string | number;
}

export const TextBoxGroup: React.FunctionComponent<TextBoxGroupProps> = (props: TextBoxGroupProps) => {
    return (
        <div className={"form-group input-box-group" + (props.className ? ` ${props.className}` : "")}>
            {props.label && <label className="custom-label" htmlFor={props.name}>{props.label}</label>}
            <div className={"input-group" + (props.error ? " has-error" : "") + (props.disabled ? " disabled" : "")} >
                <div className="input-box-group-wrapper">
                    {(props.leftIcon || props.leftText) &&
                        <div className={"input-group-prepend" + (props.onLeftClick ? " clickable" : "")} role={props.onLeftClick ? "button" : ""} onClick={props.onLeftClick}>
                            {props.leftText && <span className="input-group-text" title={props.leftTitle}>{props.leftText}</span>}
                            {(props.leftIcon && !props.leftText) &&
                                <span className="input-group-text">
                                    {props.leftIcon}
                                </span>
                            }
                        </div>
                    }
                    <input
                        id={props.id}
                        name={props.name}
                        type={props.type}
                        pattern={props.pattern}
                        required={props.required}
                        minLength={props.minLength}
                        maxLength={props.maxLength}
                        value={props.value}
                        onChange={props.onChange}
                        placeholder={props.placeHolder}
                        className="form-control"
                        autoFocus={props.focus}
                        autoComplete={props.autoComplete ? "on" : "off"}
                        readOnly={props.readonly}
                        disabled={props.disabled}
                        onKeyDown={props.onKeyDown}
                        onKeyUp={props.onKeyUp}
                        onKeyPress={props.onKeyPress}
                        onFocus={props.onFocus}
                        onBlur={props.onBlur}
                        ref={props.reference}
                    />
                    {(props.rightIcon || props.rightText) &&
                        <div className={"input-group-append" + (props.onRightClick ? " clickable" : "")} onClick={props.onRightClick} role={props.onRightClick ? "button" : ""}>
                            {props.rightText && <span className="input-group-text" title={props.rightTitle}>{props.rightText}</span>}
                            {(props.rightIcon && !props.rightText) &&
                                <span className="input-group-text">
                                    {props.rightIcon}
                                </span>
                            }
                        </div>
                    }
                </div>
                <div className="alert alert-danger">{props.error}</div>
            </div>
        </div>
    );
};
