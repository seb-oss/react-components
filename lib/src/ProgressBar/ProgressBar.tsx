import React from "react";
import classnames from "classnames";
import "./progressbar.scss";

export type ProgressBarProps = JSX.IntrinsicElements["progress"] & {
    /** Progress bar theme */
    theme?: "purple" | "primary" | "danger" | "success" | "warning" | "inverted";
};
/** A visual representation of progress for loading content. */
export const ProgressBar: React.FC<ProgressBarProps> = React.forwardRef(({ theme = "primary", ...props }: ProgressBarProps, ref: React.ForwardedRef<HTMLProgressElement>) => {
    return <progress {...props} ref={ref} className={classnames("rc progress-bar", { [`theme-${theme}`]: theme }, props.className)} />;
});
