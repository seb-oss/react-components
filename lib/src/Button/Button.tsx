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

const Button: React.FC<ButtonProps> = React.memo(({ theme = "primary", size, block, ...props }: ButtonProps) => {
    const [className, setClassName] = React.useState<string>("btn btn-primary");

    React.useEffect(() => {
        setClassName(classnames("rc", "btn", `btn-${theme}`, { [`btn-${size}`]: size, "btn-block": block }, props.className));
    }, [size, theme, block, props.className]);

    return (
        <button {...props} className={className}>
            {props.children}
        </button>
    );
});

export { Button };
