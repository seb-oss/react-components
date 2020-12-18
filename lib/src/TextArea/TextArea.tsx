import React from "react";
import { randomId } from "@sebgroup/frontend-tools";
import classnames from "classnames";
import "./textarea.scss";

export type TextAreaProps = JSX.IntrinsicElements["textarea"] & {
    /** Error message related to element */
    error?: string;
    /** Element label */
    label?: string;
    /** Property sets whether textarea is resizable */
    resizable?: boolean;
};
/** Textarea is a component that allows user to add or edit text in multiline */
export const TextArea: React.FC<TextAreaProps> = ({ error, label, resizable, className, ...props }: TextAreaProps) => {
    const [id, setId] = React.useState<string>();

    React.useEffect(() => {
        setId(props.id ? props.id : label ? randomId("textarea-") : null);
    }, [props.id, label]);

    return (
        <div className={classnames("form-group text-area", className)}>
            <div className={classnames("input-field", { "has-error": !!error })}>
                {label && (
                    <label className="custom-label" htmlFor={id}>
                        {label}
                    </label>
                )}
                <textarea className={classnames("form-control", { resizable: !!resizable })} {...props} />
                <div className="alert alert-danger">{error}</div>
            </div>
        </div>
    );
};
