import React from "react";
import classnames from "classnames";
import { ToggleSelectorItemProps } from "./ToggleSelectorItem";
import { FeedbackIndicator, Indicator } from "../FeedbackIndicator";
import { randomId } from "@sebgroup/frontend-tools/randomId";
import "./toggle-selector.scss";

interface ToggleSelectorSingleProps {
    /** allow multiple selections */
    multiple?: false;
    /** selected value */
    value?: number;
    /** on toggle selector change */
    onChange?: (value: number) => void;
}

interface ToggleSelectorMultipleProps {
    /** allow multiple selections */
    multiple?: true;
    /** selected values */
    value?: readonly number[];
    /** on toggle selector change */
    onChange?: (value: number[]) => void;
}

type ToggleSelectorValueProps = ToggleSelectorSingleProps | ToggleSelectorMultipleProps;
type NativeDivProps = JSX.IntrinsicElements["fieldset"];

export type ToggleSelectorProps = NativeDivProps &
    ToggleSelectorValueProps & {
        /** Element label */
        label?: React.ReactNode;
        /** disable element */
        disabled?: boolean;
        /** Form indicator */
        indicator?: Indicator;
    };

/** A selector to display and select options in a flow. */
export const ToggleSelector: React.FC<ToggleSelectorProps> = React.forwardRef(
    ({ multiple, value, onChange, indicator, label, ...props }: ToggleSelectorProps, ref: React.ForwardedRef<HTMLFieldSetElement>) => {
        const [name] = React.useState<string>(randomId("ts-"));

        const handleChange = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>, childOnChange: React.ChangeEventHandler<HTMLInputElement>) => {
                if (onChange) {
                    if (multiple) {
                        const values: number[] = (value as number[]) || [];
                        const index: number = parseInt(e.target.dataset.indexNumber);
                        if (values.includes(index)) {
                            onChange(values.filter((item) => item !== index) as any);
                        } else {
                            onChange([...values, index].sort() as any);
                        }
                    } else {
                        onChange(parseInt(e.target.dataset.indexNumber) as any);
                    }
                }
                childOnChange && childOnChange(e);
            },
            [value, multiple, onChange]
        );

        return (
            <fieldset {...props} ref={ref} className={classnames("rc", "toggle-selector", props.className)}>
                <FeedbackIndicator {...indicator} noBorder>
                    {!!label && <legend>{label}</legend>}
                    {props.children &&
                        React.Children.map(props.children, (Child: React.ReactElement<ToggleSelectorItemProps>, index: number) => {
                            return React.isValidElement<ToggleSelectorItemProps>(Child)
                                ? React.cloneElement<ToggleSelectorItemProps & { [k: string]: any }>(Child as any, {
                                      onChange: (e) => handleChange(e, Child.props?.onChange),
                                      name: multiple ? null : name,
                                      disabled: props.disabled || Child.props?.disabled,
                                      type: multiple ? "checkbox" : "radio",
                                      checked: multiple ? (Array.isArray(value) ? value.includes(index) : false) : (value as number) === index,
                                      "data-index-number": index,
                                  })
                                : Child;
                        })}
                </FeedbackIndicator>
            </fieldset>
        );
    }
) as React.ForwardRefExoticComponent<React.PropsWithoutRef<ToggleSelectorProps & ToggleSelectorMultipleProps> & React.RefAttributes<HTMLFieldSetElement>>;
