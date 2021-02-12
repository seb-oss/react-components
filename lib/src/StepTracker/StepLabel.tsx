import React from "react";
import classnames from "classnames";

export type StepLabelProps = JSX.IntrinsicElements["div"] & {
    isActive?: boolean;
};

const StepLabel: React.FC<StepLabelProps> = React.forwardRef(({ isActive, ...props }: StepLabelProps, ref: React.RefObject<HTMLDivElement>) => {
    return (
        <div ref={ref} className={classnames("text", { active: isActive })} {...props}>
            <div className="name">{props.children}</div>
        </div>
    );
});

export { StepLabel };
