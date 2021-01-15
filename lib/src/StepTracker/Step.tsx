import React from "react";
import classnames from "classnames";

export type StepProps = JSX.IntrinsicElements["div"] & {
    /** Active state */
    active?: boolean;
};

export const Step: React.FC<StepProps> = React.forwardRef(({ active, ...props }: StepProps, ref: React.RefObject<HTMLDivElement>) => {
    return (
        <div ref={ref} className={classnames("text", { active })} {...props}>
            <div className="name">{props.children}</div>
        </div>
    );
});
