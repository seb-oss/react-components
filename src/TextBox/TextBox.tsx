import * as React from "react";
import "./text-box-style.scss";
import { randomId } from "../__utils/randomId";

export interface TextBoxProps {
    autoComplete?: "on" | "off";
    className?: string;
    disabled?: boolean;
    error?: string;
    focus?: boolean;
    id?: string;
    label?: string;
    maxLength?: number;
    minLength?: number;
    name: string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    pattern?: string;
    placeholder?: string;
    readOnly?: boolean;
    reference?: React.RefObject<HTMLInputElement>;
    required?: boolean;
    success?: boolean;
    type?: string;
    value: string | number;
    showErrorMessage?: boolean;
}

export const TextBox: React.FunctionComponent<TextBoxProps> = (props: TextBoxProps): React.ReactElement<void> => {
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
        <div className={"form-group input-box" + (props.className ? ` ${props.className}` : "")}>
            <div className={"input-field" + (props.success ? " success" : props.error ? " has-error" : "")}>
                {props.label && (
                    <label className="custom-label" htmlFor={id}>
                        {props.label}
                    </label>
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
                    onKeyDown={props.onKeyDown}
                    onKeyUp={props.onKeyUp}
                    onKeyPress={props.onKeyPress}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    placeholder={props.placeholder}
                    className="form-control"
                    autoFocus={props.focus}
                    autoComplete={props.autoComplete}
                    readOnly={props.readOnly}
                    disabled={props.disabled}
                    ref={props.reference}
                />
                {showErrorMessage && <div className="alert alert-danger">{props.error}</div>}
            </div>
        </div>
    );
};
