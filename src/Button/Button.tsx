import React from "react";
import classnames from "classnames";

export type ButtonTheme = "primary" | "secondary" | "danger" | "outline-primary" | "outline-danger" | "dark" | "light" | "link";
export type ButtonSizes = "lg" | "md" | "sm";

export type ButtonProps = React.PropsWithChildren<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
        /** Button Theme */
        theme?: ButtonTheme;
        /** Button size */
        size?: ButtonSizes;
        /** Fill the parent width */
        block?: boolean;
    }
>;

const Button: React.FC<ButtonProps> = React.memo(
    ({ theme, size, block, className, ...props }: ButtonProps): React.ReactElement<void> => {
        const [processedClassName, setProcessedClassName] = React.useState<string>("btn btn-primary");

        React.useEffect(() => {
            setProcessedClassName(classnames(["btn", "btn-" + (theme || "primary"), size && "btn-" + size, { "btn-block": block }, className]));
        }, [size, theme, block, className]);

        return (
            <button {...props} className={processedClassName}>
                {props.children}
            </button>
        );
    }
);

export { Button };
