import * as React from "react";
import "./text-box-style.scss";

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
    readonly?: boolean;
    reference?: React.RefObject<HTMLInputElement>;
    required?: boolean;
    success?: boolean;
    type?: string;
    value: string | number;
    showErrorMessage?: boolean;
}

export const TextBox: React.FunctionComponent<TextBoxProps> = (props: TextBoxProps): React.ReactElement<void> => {
    const [showErrorMessage, setShowErrorMessage] = React.useState<boolean>(true);

    React.useEffect(() => {
        setShowErrorMessage(props.showErrorMessage === undefined || props.showErrorMessage === null ? true : !!props.showErrorMessage);
    }, [props.showErrorMessage]);

    return (
        <div className={"form-group input-box" + (props.className ? ` ${props.className}` : "")}>
            <div className={"input-field" + (props.success ? " success" : props.error ? " has-error" : "")}>
                {props.label && <label className="custom-label" htmlFor={props.name}>{props.label}</label>}
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
                    onKeyDown={props.onKeyDown}
                    onKeyUp={props.onKeyUp}
                    onKeyPress={props.onKeyPress}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    placeholder={props.placeholder}
                    className="form-control"
                    autoFocus={props.focus}
                    autoComplete={props.autoComplete}
                    readonly={props.readonly}
                    disabled={props.disabled}
                    ref={props.reference}
                />
                {showErrorMessage && !props.success ? <div className="alert alert-danger">{props.error}</div> : null}
            </div>
        </div>
    );
};
