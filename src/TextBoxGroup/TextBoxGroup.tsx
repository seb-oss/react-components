import * as React from "react";
import "./text-box-group-style.scss";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";

export interface TextBoxGroupProps {
    autoComplete?: "on" | "off";
    className?: string;
    disabled?: boolean;
    error?: string;
    focus?: boolean;
    id?: string;
    label?: string;
    leftIcon?: React.ReactNode;
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
    placeholder?: string;
    readOnly?: boolean;
    reference?: React.RefObject<HTMLInputElement>;
    required?: boolean;
    rightIcon?: React.ReactNode;
    rightText?: string;
    rightTitle?: string;
    type?: string;
    value: string | number;
    success?: boolean;
    showErrorMessage?: boolean;
}

export const TextBoxGroup: React.FunctionComponent<TextBoxGroupProps> = (props: TextBoxGroupProps) => {
    const [id, setId] = React.useState<string>(null);
    const [showErrorMessage, setShowErrorMessage] = React.useState<boolean>(true);

    React.useEffect(() => {
        setId(props.id ? props.id : props.label ? randomId("tbg-") : null);
    }, [props.id, props.label]);

    React.useEffect(() => {
        if (props.success) {
            // Only false when success is enabled
            setShowErrorMessage(false);
        } else if (props.showErrorMessage === false) {
            // `showErrorMessage` is set to boolean false
            setShowErrorMessage(false);
        } else {
            // If set to true, or it will be defaulted if the value is not passed
            setShowErrorMessage(true);
        }
    }, [props.showErrorMessage, props.success]);

    return (
        <div className={"form-group input-box-group" + (props.className ? ` ${props.className}` : "")}>
            {props.label && (
                <label className="custom-label" htmlFor={id}>
                    {props.label}
                </label>
            )}
            <div className={"rc input-group" + (props.success ? " success" : props.error ? " has-error" : "") + (props.disabled ? " disabled" : "")}>
                <div className="input-box-group-wrapper">
                    {(props.leftIcon || props.leftText) && (
                        <div className={"input-group-prepend" + (props.onLeftClick ? " clickable" : "")} role={props.onLeftClick ? "button" : ""} onClick={props.onLeftClick}>
                            {props.leftText && (
                                <span className="input-group-text" title={props.leftTitle}>
                                    {props.leftText}
                                </span>
                            )}
                            {props.leftIcon && !props.leftText && <span className="input-group-text">{props.leftIcon}</span>}
                        </div>
                    )}
                    <input
                        id={id}
                        name={props.name}
                        type={props.type}
                        pattern={props.pattern}
                        required={props.required}
                        minLength={props.minLength}
                        maxLength={props.maxLength}
                        value={String(props.value)}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        className="form-control"
                        autoFocus={props.focus}
                        autoComplete={props.autoComplete}
                        readOnly={props.readOnly}
                        disabled={props.disabled}
                        onKeyDown={props.onKeyDown}
                        onKeyUp={props.onKeyUp}
                        onKeyPress={props.onKeyPress}
                        onFocus={props.onFocus}
                        onBlur={props.onBlur}
                        ref={props.reference}
                    />
                    {(props.rightIcon || props.rightText) && (
                        <div className={"input-group-append" + (props.onRightClick ? " clickable" : "")} onClick={props.onRightClick} role={props.onRightClick ? "button" : ""}>
                            {props.rightText && (
                                <span className="input-group-text" title={props.rightTitle}>
                                    {props.rightText}
                                </span>
                            )}
                            {props.rightIcon && !props.rightText && <span className="input-group-text">{props.rightIcon}</span>}
                        </div>
                    )}
                </div>
                {showErrorMessage && <div className="alert alert-danger">{props.error}</div>}
            </div>
        </div>
    );
};
