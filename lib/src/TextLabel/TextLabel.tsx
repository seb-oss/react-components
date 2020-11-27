import React from "react";
import "./text-label-style.scss";
import classnames from "classnames";

export type TextLabelProps = JSX.IntrinsicElements["div"] & {
    /** Optional label for the textLabel can be a string or a template. */
    label?: string | React.ReactNode;
    /** Optional label for the text label can be a string or a template. */
    value: string | number | React.ReactNode;
};

/** A text label is a component to display value with label */
export const TextLabel: React.FC<TextLabelProps> = React.memo(({ label, value, ...props }: TextLabelProps) => {
    return (
        <div className={classnames("text-label", props.className)} {...props}>
            {label && <label className="custom-label">{label}</label>}
            <div className="custom-label-value">{value}</div>
        </div>
    );
});
