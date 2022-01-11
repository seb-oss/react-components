import React from "react";
import classnames from "classnames";
import { FeedbackIndicator, Indicator } from "../FeedbackIndicator";
import { RadioButtonProps } from "./RadioButton";
import "./radio-group.scss";

export type RadioGroupProps<T = React.ReactText> = JSX.IntrinsicElements["fieldset"] & {
    /** The name of the group */
    name: string;
    /** Form indicator */
    indicator?: Indicator;
    /** Disable the whole group */
    disabled?: boolean;
    /** The value of the group */
    value?: T;
    /** On change handler */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /** Element label */
    label?: React.ReactNode;
};
/** A radio button allows a user to select a single item from a predefined list of options. Radio buttons are common to use in forms, i.e when you apply for a loan and need to enter "Yes" or "No". */
export const RadioGroup: React.FC<RadioGroupProps> = React.forwardRef(
    ({ name, indicator, disabled, value, label, onChange, ...props }: RadioGroupProps, ref: React.ForwardedRef<HTMLFieldSetElement>) => (
        <FeedbackIndicator {...indicator}>
            <fieldset {...props} ref={ref} className={classnames("radio-group", props.className)}>
                {!!label && <legend>{label}</legend>}
                {React.Children.map(props.children, (Child: React.ReactElement<RadioButtonProps>) =>
                    React.isValidElement<React.FC<RadioButtonProps>>(Child)
                        ? React.cloneElement<any>(Child, {
                              checked: value === Child.props.value,
                              disabled: disabled || Child.props.disabled,
                              onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e),
                          })
                        : Child
                )}
            </fieldset>
        </FeedbackIndicator>
    )
);
