import React from "react";
import { randomId } from "@sebgroup/frontend-tools/dist/randomId";
import classnames from "classnames";
import "./toggle.scss";

export type ToggleProps = JSX.IntrinsicElements["input"] & {
    label?: string;
    inline?: boolean;
    wrapperProps?: JSX.IntrinsicElements["div"];
};

export const Toggle: React.FC<ToggleProps> = ({ wrapperProps, label, inline, ...props }: ToggleProps) => {
    const [id, setId] = React.useState<string>(props.id);

    React.useEffect(() => setId(props.id || (!!label ? randomId("toggle-") : null)), [props.id]);

    return (
        <div {...wrapperProps} className={classnames("seb", "custom-control", "custom-slide-toggle", { inline }, wrapperProps?.className)}>
            <input {...props} className={classnames("custom-control-input", props.className)} id={id} type="checkbox" role={props.role || "switch"} />
            {label && (
                <label className="custom-control-label" htmlFor={id}>
                    {label}
                </label>
            )}
        </div>
    );
};
