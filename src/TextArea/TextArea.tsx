import * as React from "react";
import { randomId } from "../__utils/randomId";
import "./text-area-style.scss";

export interface TextAreaProps {
    className?: string;
    cols?: number;
    disabled?: boolean;
    error?: string;
    focus?: boolean;
    id?: string;
    label?: string;
    max?: number;
    name: string;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    readonly?: boolean;
    reference?: React.RefObject<HTMLTextAreaElement>;
    resizable?: boolean;
    rows?: number;
    value: string;
}

export const TextArea: React.FunctionComponent<TextAreaProps> = (props: TextAreaProps): React.ReactElement<void> => {
    const [id, setId] = React.useState<string>();

    React.useEffect(() => {
        setId(props.id ? props.id : (props.label ? randomId("textarea-") : null));
    }, [props.id, props.label]);

    return (
        <div className={"form-group text-area" + (props.className ? ` ${props.className}` : "")}>
            <div className={"input-field" + (props.error ? " has-error" : "")}>
                {props.label && <label className="custom-label" htmlFor={id}>{props.label}</label>}
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
