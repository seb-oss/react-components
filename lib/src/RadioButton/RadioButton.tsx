import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools/randomId";
import { FeedbackIndicator, Indicator } from "../FeedbackIndicator";
import "./radio-button.scss";

export type RadioButtonProps<T = React.ReactText> = Omit<JSX.IntrinsicElements["input"], "value"> & {
    /** Radio button value */
    value?: T;
    indicator?: Indicator;
    /** Props for the div wrapper around the radio input element */
    wrapperProps?: JSX.IntrinsicElements["div"];
};
/** A radio button allows a user to select a single item from a predefined list of options. Radio buttons are common to use in forms, i.e when you apply for a loan and need to enter "Yes" or "No". */
export const RadioButton: React.FC<RadioButtonProps> = React.forwardRef(({ children, indicator, wrapperProps = {}, ...props }: RadioButtonProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [id, setId] = React.useState<string>("");

    React.useEffect(() => setId(props.id || randomId("radiobtn-")), [props.id]);

    return (
        <FeedbackIndicator {...indicator}>
            <div {...wrapperProps} className={classnames("rc radio-button", wrapperProps.className)}>
                <label htmlFor={id} className="rc custom-radio custom-control">
                    <input {...props} ref={ref} className={classnames("custom-control-input", props.className)} type="radio" id={id} />
                    {children && (
                        <label htmlFor={id} className="custom-control-label">
                            {children}
                        </label>
                    )}
                </label>
            </div>
        </FeedbackIndicator>
    );
});
