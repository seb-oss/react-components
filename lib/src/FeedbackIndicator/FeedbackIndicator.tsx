import React from "react";
import classnames from "classnames";
import "./feedback-indicator.scss";

export type IndicatorType = "danger" | "warning" | "success";
export type Indicator = {
    /** The type of the indicator. Available values: "danger" | "warning" | "success" */
    type: IndicatorType;
    /** The indicator message. `children` can also be used instead. */
    message?: React.ReactNode;
};

export type FeedbackIndicatorProps = JSX.IntrinsicElements["div"] &
    Indicator & {
        /** To show indicator without border */
        withoutBorder?: boolean;
    };
/** A helper component to display feedback for children content */
export const FeedbackIndicator: React.FC<FeedbackIndicatorProps> = React.memo(({ type, message, children, withoutBorder, ...props }: FeedbackIndicatorProps) => {
    const [indicatorValue, setIndicatorValue] = React.useState<number>(0);

    React.useEffect(() => {
        switch (type) {
            case "danger":
                setIndicatorValue(10);
                break;
            case "warning":
                setIndicatorValue(50);
                break;
            case "success":
                setIndicatorValue(100);
                break;
            default:
                setIndicatorValue(0);
        }
    }, [type]);

    return (
        <div {...props} className={classnames("rc", "progress-feedback", `progress-${indicatorValue}`, { "wrapper-indicator": children }, props.className)}>
            {children && <div className={classnames("children", { "no-border": withoutBorder })}>{children}</div>}
            {message}
        </div>
    );
});
