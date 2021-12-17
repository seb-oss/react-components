import React from "react";
import classnames from "classnames";
import "./steplabel.scss";

const checkIcon: JSX.Element = (
    <svg fill="currentColor" name="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z" />
    </svg>
);

export type StepLabelProps = JSX.IntrinsicElements["li"] & {
    isActive?: boolean;
    isCompleted?: boolean;
    isNumbered?: boolean;
    label: React.ReactNode;
    count?: number;
};

const StepLabel: React.FC<StepLabelProps> = React.forwardRef(({ label, isActive, isCompleted, isNumbered, count, className, ...props }: StepLabelProps, ref: React.RefObject<HTMLLIElement>) => {
    const renderLabel = () => {
        if (isNumbered) {
            return count;
        }
        if (isCompleted) {
            return checkIcon;
        }
        return null;
    };

    return (
        <li {...props} ref={ref} className={classnames(className, "step-label", { "step-label--active": isActive, "step-label--completed": isCompleted })}>
            <div aria-hidden="true" role="none" className={classnames("step-label__label", { "step-label__label--numbered": isNumbered })}>
                {renderLabel()}
            </div>
            <div className="step-label__name">{label}</div>
        </li>
    );
});

export { StepLabel };
