import React from "react";
import { randomId } from "@sebgroup/frontend-tools/randomId";
import classnames from "classnames";
import { FeedbackIndicator, Indicator } from "../FeedbackIndicator/FeedbackIndicator";
import "./checkbox.scss";

export type CheckboxProps = JSX.IntrinsicElements["input"] & {
    /** Displays the checkbox inline */
    inline?: boolean;
    /** Div wrapper props */
    wrapperProps?: JSX.IntrinsicElements["div"];
    /** Indicator for error, warning or success */
    indicator?: Indicator;
};

export const Checkbox: React.FC<CheckboxProps> = React.forwardRef(({ inline, wrapperProps, indicator, children, ...props }: CheckboxProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [id, setId] = React.useState<string>(props.id);

    React.useEffect(() => setId(props.id || (children ? props.id || randomId("checkbox-") : null)), [props.id, children]);

    return (
        <FeedbackIndicator {...indicator}>
            <div {...wrapperProps} className={classnames("rc", "checkbox", { inline }, wrapperProps?.className)}>
                <label htmlFor={id} className={classnames("custom-control", "custom-checkbox", { "custom-control-inline": inline })}>
                    <input {...props} type="checkbox" id={id} className={classnames("custom-control-input", props.className)} ref={ref} />
                    <label htmlFor={id} className="custom-control-label">
                        {children}
                    </label>
                </label>
            </div>
        </FeedbackIndicator>
    );
});
