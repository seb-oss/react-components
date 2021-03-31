import React from "react";
import classnames from "classnames";

export type ButtonTheme = "primary" | "secondary" | "danger" | "outline-primary" | "outline-danger" | "dark" | "light" | "link";
export type ButtonSize = "lg" | "md" | "sm";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
    /** Button Theme */
    theme?: ButtonTheme;
    /** Button size */
    size?: ButtonSize;
    /** Fill the parent width */
    block?: boolean;
};
/** Buttons allow users to take action with a single tap. */
export const Button: React.FC<ButtonProps> = React.memo(
    React.forwardRef(({ theme = "primary", size, block, ...props }: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
        return (
            <button {...props} ref={ref} className={classnames("rc", "btn", `btn-${theme}`, { [`btn-${size}`]: size, "btn-block": block }, props.className)}>
                {props.children}
            </button>
        );
    })
);
