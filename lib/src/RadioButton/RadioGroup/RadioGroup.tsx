import React from "react";
import classnames from "classnames";
import { FeedbackIndicator, Indicator } from "../../FeedbackIndicator";
import { RadioButtonProps } from "../RadioButton";

export type RadioGroupProps<T = React.ReactText> = JSX.IntrinsicElements["div"] & {
    /** The name of the group */
    name: string;
    /** Inline radio group */
    inline?: boolean;
    /** Form indicator */
    indicator?: Indicator;
    /** Disable the whole group */
    disabled?: boolean;
    /** The value of the group */
    value?: T;
    /** On change handler */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};
/** A radio button allows a user to select a single item from a predefined list of options. Radio buttons are common to use in forms, i.e when you apply for a loan and need to enter "Yes" or "No". */
export const RadioGroup: React.FC<RadioGroupProps> = ({ name, inline, indicator, disabled, value, onChange, ...props }: RadioGroupProps) => (
    <FeedbackIndicator {...indicator}>
        <div {...props} className={classnames("radio-group", props.className)}>
            {React.Children.map(props.children, (Child: React.ReactElement<RadioButtonProps>) =>
                React.isValidElement<React.FC<RadioButtonProps>>(Child)
                    ? React.cloneElement<any>(Child, {
                          checked: value === Child.props.value,
                          inline: inline || Child.props.inline,
                          disabled: disabled || Child.props.disabled,
                          onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e),
                      })
                    : Child
            )}
        </div>
    </FeedbackIndicator>
);
