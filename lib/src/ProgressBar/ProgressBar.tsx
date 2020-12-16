import React from "react";
import classnames from "classnames";
import "./progressbar.scss";

export type ProgressBarProps = JSX.IntrinsicElements["div"] & {
    /** Show percentage of progress */
    showProgress?: boolean;
    /** Progress value */
    value: number;
};
/** A visual representation of progress for loading content. */
export const ProgressBar: React.FC<ProgressBarProps> = ({ showProgress, value, ...props }: ProgressBarProps) => {
    return (
        <div className={classnames("rc progress-bar", props.className)} {...props}>
            <div className={classnames("custom-progress-bar", { "show-progress": showProgress })} style={{ width: `${value}%` }} />
            {showProgress && <div className={classnames("custom-progress-text", { white: value > 49 })}>{value + "%"}</div>}
        </div>
    );
};
