import React from "react";
import classnames from "classnames";

export type ButtonGroupSizes = "sm" | "md" | "lg";

export type ButtonGroupProps = JSX.IntrinsicElements["div"] & {
    /** Display buttons vertically */
    vertical?: boolean;
    /** Buttons size in the group. Available sizes: "sm", "md", "lg" */
    size?: ButtonGroupSizes;
};

/** Button group wrapper. Use this to group multiple buttons */
export const ButtonGroup: React.FC<ButtonGroupProps> = React.memo(({ vertical, size, ...props }: ButtonGroupProps) => (
    <div
        {...props}
        className={classnames(
            "rc",
            "btn-group",
            {
                [`btn-group-${size}`]: size,
                "btn-group-vertical": vertical,
            },
            props.className
        )}
        role={props.role || "group"}
    >
        {props.children}
    </div>
));
