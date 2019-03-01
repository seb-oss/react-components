import * as React from "react";
import "./text-area-style.scss";

export interface TextAreaProps {
    value: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    label?: string;
    error?: string;
    placeHolder?: string;
    className?: string;
    focus?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    cols?: number;
    rows?: number;
    resizable?: boolean;
    max?: number;
    reference?: React.RefObject<HTMLTextAreaElement>;
}

export const TextArea: React.StatelessComponent<TextAreaProps> = (props: TextAreaProps): React.ReactElement<void> => {
    return (
        <div className={"form-group text-area" + (props.className ? ` ${props.className}` : "")}>
            <div className={"input-field" + (props.error ? " has-error" : "")}>
                {props.label && <label className="custom-label" htmlFor={props.name}>{props.label}</label>}
                <textarea
                    name={props.name}
                    className={"form-control" + (props.resizable || props.resizable === undefined ? " resizable" : "")}
                    placeholder={props.placeHolder}
                    maxLength={props.max}
                    autoFocus={props.focus}
                    readOnly={props.readonly}
                    disabled={props.disabled}
                    cols={props.cols}
                    rows={props.rows}
                    onChange={props.onChange}
                    onKeyDown={props.onKeyDown}
                    onKeyUp={props.onKeyUp}
                    onKeyPress={props.onKeyPress}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    value={props.value}
                    ref={props.reference}
                />
                <div className="alert alert-danger">{props.error}</div>
            </div>
        </div>
    );
};
