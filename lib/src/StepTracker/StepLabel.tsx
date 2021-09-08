import React from "react";
import classnames from "classnames";

export type StepLabelProps = JSX.IntrinsicElements["div"] & {
    isActive?: boolean;
    label: React.ReactNode;
};

const StepLabel: React.FC<StepLabelProps> = React.forwardRef(({ label, isActive, ...props }: StepLabelProps, ref: React.RefObject<HTMLDivElement>) => {
    return (
        <div ref={ref} className={classnames("text", { active: isActive })} {...props}>
            <div className="name">{label}</div>
        </div>
    );
});

export default StepLabel;
