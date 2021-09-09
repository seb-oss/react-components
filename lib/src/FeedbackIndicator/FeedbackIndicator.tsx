import React from "react";
import classnames from "classnames";
import "./feedback-indicator.scss";

export type IndicatorType = "danger" | "warning" | "success" | "none";
export type Indicator = FeedbackIndicatorProps;

type FeedbackIndicatorProps = React.PropsWithChildren<{
    /** The type of the indicator. Available values: "danger" | "warning" | "success" */
    type: IndicatorType;
    /** The indicator message. `children` can also be used instead. */
    message?: React.ReactNode;
    /** Disable feedback indicator border */
    noBorder?: boolean;
}>;
/** A helper component to display feedback for children content */
export const FeedbackIndicator: React.FC<FeedbackIndicatorProps> = (props: FeedbackIndicatorProps) => {
    const [indicatorValue, setIndicatorValue] = React.useState<number>(0);

    React.useEffect(() => {
        switch (props.type) {
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
    }, [props.type]);

    function wrap(children: any) {
        const Child: any = React.Children.toArray(children)[0];

        return React.isValidElement(Child) ? (
            <>
                {React.cloneElement<any>(Child as any, {
                    className: classnames((Child.props as any).className, `rc-d feedback feedback-${indicatorValue}`, { "no-border": props.noBorder }, { "mb-0": props.message }),
                })}
                {props.type && <p className={classnames("rc-d feedback-message")}>{props.message}</p>}
            </>
        ) : (
            Child
        );
    }

    const count: number = React.Children.count(props.children);

    return count ? (props.type ? wrap(count > 1 ? <div>{props.children}</div> : props.children) : props.children) : null;
};
