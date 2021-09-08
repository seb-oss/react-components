import React from "react";
import { randomId } from "@sebgroup/frontend-tools/randomId";
import classnames from "classnames";
import { FeedbackIndicator, Indicator } from "../FeedbackIndicator";
import "./textarea.scss";

export type TextareaProps = JSX.IntrinsicElements["textarea"] & {
    /** Element label */
    label?: string;
    /** Property sets whether textarea is resizable */
    resizable?: boolean;
    /** Form indicator */
    indicator?: Indicator;
    /** Wrapper props (div) */
    wrapperProps?: JSX.IntrinsicElements["div"];
};
/** Textarea is a component that allows user to add or edit text in multiline */
export const Textarea: React.FC<TextareaProps> = React.forwardRef(({ indicator, label, resizable, wrapperProps = {}, ...props }: TextareaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    const [id, setId] = React.useState<string>();

    React.useEffect(() => setId(props.id ? props.id : label ? randomId("textarea-") : null), [props.id, label]);

    return (
        <div {...wrapperProps} className={classnames("rc text-area input-field", wrapperProps.className)}>
            {label && <label htmlFor={id}>{label}</label>}
            <FeedbackIndicator {...indicator}>
                <textarea {...props} ref={ref} className={classnames("form-control", { resizable }, props.className)} />
            </FeedbackIndicator>
        </div>
    );
});
