import React from "react";
import { randomId } from "@sebgroup/frontend-tools/randomId";
import classnames from "classnames";
import "./toggle.scss";

export type ToggleProps = JSX.IntrinsicElements["input"] & {
    /** Element label */
    label?: string;
    /** to set if the toggle is inline with other element */
    inline?: boolean;
    /** properties that related to div element */
    wrapperProps?: JSX.IntrinsicElements["div"];
};
/** A Slide toggle allows the user to change between two states */
export const Toggle: React.FC<ToggleProps> = React.forwardRef(({ wrapperProps, label, inline, ...props }: ToggleProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [id, setId] = React.useState<string>(props.id);

    React.useEffect(() => setId(props.id || (!!label ? randomId("toggle-") : null)), [props.id]);

    return (
        <div {...wrapperProps} className={classnames("rc", "custom-control", "custom-slide-toggle", { inline }, wrapperProps?.className)}>
            <input {...props} ref={ref} className={classnames("custom-control-input", props.className)} id={id} type="checkbox" />
            {label && (
                <label className="custom-control-label" htmlFor={id}>
                    {label}
                </label>
            )}
        </div>
    );
});
