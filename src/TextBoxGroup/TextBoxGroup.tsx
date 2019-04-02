import * as React from "react";
import "./text-box-group-style.scss";

export interface TextBoxGroupProps {
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

    leftText?: string;
    rightText?: string;

    leftIcon?: any;
    rightIcon?: any;

    rightTitle?: string;
    leftTitle?: string;
    onRightClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onLeftClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    reference?: React.RefObject<HTMLInputElement>;
}

export const TextBoxGroup: React.FunctionComponent<TextBoxGroupProps> = React.memo((props: TextBoxGroupProps) => {
    return (
        <div className={"form-group input-box-group" + (props.className ? ` ${props.className}` : "")}>
            {props.label && <label className="custom-label" htmlFor={props.name}>{props.label}</label>}
            <div className={"input-group" + (props.error ? " has-error" : "") + (props.disabled ? " disabled" : "")} >
                <div className="input-box-group-wrapper">
                    {(props.leftIcon || props.leftText) &&
                        <div className={"input-group-prepend" + (props.onLeftClick ? " clickable" : "")} onClick={props.onLeftClick}>
                            {props.leftText && <span className="input-group-text" title={props.leftTitle}>{props.leftText}</span>}
                            {(props.leftIcon && !props.leftText) &&
                                <span className="input-group-text">
                                    {props.leftIcon}
                                </span>
                            }
                        </div>
                    }
                    <input
                        name={props.name}
                        type={props.type}
                        value={props.value}
                        onChange={props.onChange}
                        placeholder={props.placeHolder}
                        className="form-control"
                        autoFocus={props.focus}
                        autoComplete={props.autoComplete ? "on" : "off"}
                        readOnly={props.readonly}
                        disabled={props.disabled}
                        maxLength={props.max}
                        onKeyDown={props.onKeyDown}
                        onKeyUp={props.onKeyUp}
                        onKeyPress={props.onKeyPress}
                        onFocus={props.onFocus}
                        onBlur={props.onBlur}
                        ref={props.reference}
                    />
                    {(props.rightIcon || props.rightText) &&
                        <div className={"input-group-append" + (props.onRightClick ? " clickable" : "")} onClick={props.onRightClick}>
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
});
