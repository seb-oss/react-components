import React from "react";
import classnames from "classnames";
import { randomId } from "@sebgroup/frontend-tools";
import { FeedbackIndicator, Indicator } from "../FeedbackIndicator";
import { RadioGroup } from "./RadioGroup";
import "./radio-button.scss";

export type RadioProps<T = React.ReactText> = Omit<JSX.IntrinsicElements["input"], "value"> & {
    /** Radio button value */
    value?: T;
    indicator?: Indicator;
    /** Props for the div wrapper around the radio input element */
    wrapperProps?: JSX.IntrinsicElements["div"];
};
/** A radio button allows a user to select a single item from a predefined list of options. Radio buttons are common to use in forms, i.e when you apply for a loan and need to enter "Yes" or "No". */
const Radio = ({ children, indicator, wrapperProps = {}, ...props }: RadioProps) => {
    const [id, setId] = React.useState<string>("");

    React.useEffect(() => setId(props.id || randomId("radiobtn-")), [props.id]);

    return (
        <FeedbackIndicator {...indicator}>
            <div {...wrapperProps} className={classnames("rc radio-button", wrapperProps.className)}>
                <div className="rc custom-radio custom-control">
                    <input {...props} className={classnames("custom-control-input", props.className)} type="radio" id={id} />
                    {children && (
                        <label className="custom-control-label" htmlFor={id}>
                            {children}
                        </label>
                    )}
                </div>
            </div>
        </FeedbackIndicator>
    );
};

Radio.Group = RadioGroup;

export { Radio };
