import React from "react";
import { randomId } from "@sebgroup/frontend-tools";
import "./text-box-group-style.scss";

export interface TextBoxGroupProps {
    /** Property sets to check if textbox is allowed to auto complete */
    autoComplete?: "on" | "off";
    /** Element class name */
    className?: string;
    /** Property sets whether textbox is disabled */
    disabled?: boolean;
    /** Error message of textbox */
    error?: string;
    /** Property sets whether textbox is focused */
    focus?: boolean;
    /** Element ID */
    id?: string;
    /** Element label */
    label?: string;
    /** Element left icon */
    leftIcon?: React.ReactNode;
    /** Element left text */
    leftText?: string;
    /** Element left title */
    leftTitle?: string;
    /** Maximum allowed length for input */
    maxLength?: number;
    /** Minimum allowed length for input */
    minLength?: number;
    /** Element name */
    name: string;
    /** Callback when textbox is defocused */
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /** Callback when textbox's value is changed */
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /** Callback when textbox is focused */
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /** Callback when key is pressed */
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    /** Callback when a key that produces a character value is pressed down */
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    /** Callback when key is released */
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    /** Callback when left icon/text button is clicked */
    onLeftClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Callback when right icon/text button is clicked */
    onRightClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Element pattern */
    pattern?: string;
    /** Element placeholder */
    placeholder?: string;
    /** Property sets whether textbox is readonly */
    readOnly?: boolean;
    /** Component associates with input ref */
    reference?: React.RefObject<HTMLInputElement>;
    /** Property sets whether textbox is required */
    required?: boolean;
    /** Element right icon */
    rightIcon?: React.ReactNode;
    /** Element right text */
    rightText?: string;
    /** Element right title */
    rightTitle?: string;
    /** Input type */
    type?: string;
    /** Text box value */
    value: string | number;
    /** Property sets whether textbox is set to success theme */
    success?: boolean;
    /** Property sets whether error message should be shown */
    showErrorMessage?: boolean;
}
/** TextboxGroup is a component that allows user to add or edit text with extra text or icon port */
export const TextBoxGroup: React.FC<TextBoxGroupProps> = (props: TextBoxGroupProps) => {
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
