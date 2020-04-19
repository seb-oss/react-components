import React from "react";
import classnames from "classnames";

export type ButtonGroupSizes = "sm" | "md" | "lg";

type ButtonGroupProps = React.PropsWithChildren<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
        vertical?: boolean;
        size?: ButtonGroupSizes;
    }
>;

/** Button group wrapper. Use this to group multiple buttons */
const ButtonGroup: React.FC<ButtonGroupProps> = React.memo(({ vertical, size, ...props }: ButtonGroupProps) => {
    const [className, setClassName] = React.useState<string>("btn-group");

    React.useEffect(() => {
        setClassName(classnames([`btn-group${vertical ? "-vertical" : ""}`, size ? `btn-group-${size}` : "", props.className]));
    }, [props.className, vertical, size]);

    return (
        <div {...props} className={className} role={props.role || "group"}>
            {props.children}
        </div>
    );
});

export { ButtonGroup };
