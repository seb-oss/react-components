import React from "react";
import { randomId } from "@sebgroup/frontend-tools";
import "./text-area-style.scss";

export interface TextAreaProps {
    /** Element class name */
    className?: string;
    /** The visible width of the textarea. It must be a positive integer. */
    cols?: number;
    /** Property sets whether textarea is disabled */
    disabled?: boolean;
    /** Error message related to element */
    error?: string;
    /** Property sets whether textarea is focused */
    focus?: boolean;
    /** Element ID */
    id?: string;
    /** Element label */
    label?: string;
    /** Maximum length of input allowed for the textarea */
    max?: number;
    /** Name of textarea */
    name: string;
    /** Callback when textbox is defocused */
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    /** Callback when textbox's value is changed */
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    /** Callback when textbox is focused */
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    /** Callback when key is pressed */
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    /** Callback when a key that produces a character value is pressed down */
    onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    /** Callback when key is released */
    onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    /** Element placeholder */
    placeholder?: string;
    /** Property sets whether textbox is readonly */
    readonly?: boolean;
    /** Component associates with input ref */
    reference?: React.RefObject<HTMLTextAreaElement>;
    /** Property sets whether textarea is resizable */
    resizable?: boolean;
    /** The visible height of the textarea. It must be a positive integer. */
    rows?: number;
    /** Textarea value */
    value: string;
}
/** Textarea is a component that allows user to add or edit text in multiline */
export const TextArea: React.FC<TextAreaProps> = (props: TextAreaProps) => {
    const [id, setId] = React.useState<string>();

    React.useEffect(() => {
        setId(props.id ? props.id : props.label ? randomId("textarea-") : null);
    }, [props.id, props.label]);

    return (
        <div className={"form-group text-area" + (props.className ? ` ${props.className}` : "")}>
            <div className={"input-field" + (props.error ? " has-error" : "")}>
                {props.label && (
                    <label className="custom-label" htmlFor={id}>
                        {props.label}
                    </label>
                )}
                <textarea
                    name={props.name}
                    className={"form-control" + (props.resizable || props.resizable === undefined ? " resizable" : "")}
                    id={id}
                    placeholder={props.placeholder}
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
