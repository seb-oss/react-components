import React from "react";
import classnames from "classnames";
import { ToggleSelectorItem, ToggleSelectorItemProps } from "./ToggleSelectorItem";
import { FeedbackIndicator, IndicatorType } from "../FeedbackIndicator";
import "./toggle-selector.scss";

export type ToggleSelectorProps = Omit<JSX.IntrinsicElements["div"], "onChange"> & {
    /** inner element of toggle selector */
    children?: React.ReactNode;
    /** list of toggle selector items */
    list?: Array<ToggleSelectorItemProps>;
    /** allow multiple selections */
    multiple?: boolean;
    /** selected value(s) */
    value: string | Array<string>;
    /** field name */
    name: string;
    /** disable element */
    disabled?: boolean;
    /** Theme of toggle seletor hint */
    hintTheme?: IndicatorType;
    /** hint message of toggle selector */
    hint?: string;
    /** icon position, default: `left` */
    iconPosition?: "left" | "right";
    /** on toggle selector change */
    onChange: (value: string | Array<string>) => void;
};

/** A selector to display and select options in a flow. */
export const ToggleSelector: React.FC<ToggleSelectorProps> = ({ className, list, multiple, value, onChange, hint, hintTheme, iconPosition, ...props }: ToggleSelectorProps) => {
    const [formattedValue, setFormattedValue] = React.useState<string | Array<string>>(value);

    /**
     * update selector value
     * @param valueList list of selected value
     * @param selectedChildProps selected child
     * @param event change event
     */
    const updateValue = React.useCallback(
        (valueList: string | Array<string>, selectedChildProps: ToggleSelectorItemProps, event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedValue: string = event.target.value;
            const checked: boolean = event.target.checked;
            const isSelectedValue: boolean = selectedChildProps?.value === selectedValue;
            if (multiple && isSelectedValue) {
                if (checked) {
                    valueList = [...(valueList as Array<string>), selectedValue];
                } else {
                    const index: number = (valueList as Array<string>).findIndex((item: string) => item === selectedValue);
                    (valueList as Array<string>).splice(index, 1);
                }
            } else if (isSelectedValue) {
                valueList = selectedValue;
            }
            return valueList;
        },
        [multiple]
    );

    /**
     * on selector change
     * @param event change event
     */
    const onSelectorChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            let newValue: string | Array<string> = multiple ? [...(value as Array<string>)] : null;
            if (list) {
                list.map((item: ToggleSelectorItemProps) => {
                    newValue = updateValue(newValue, item, event);
                });
            } else {
                React.Children.map(props.children, (Child: React.ReactElement<ToggleSelectorItemProps>) => {
                    const childProps: ToggleSelectorItemProps = Child.props;
                    newValue = updateValue(newValue, childProps, event);
                });
            }
            setFormattedValue(newValue);
            onChange(newValue);
        },
        [list, multiple, props.children]
    );

    return (
        <div className={classnames("rc toggle-selector", className)} {...props}>
            <FeedbackIndicator className={classnames({ show: hint })} type={hintTheme} withoutBorder message={hint}>
                {list?.map((item: ToggleSelectorItemProps, i: number) => (
                    <ToggleSelectorItem
                        key={i}
                        onChange={onSelectorChange}
                        value={item.value}
                        multiple={multiple}
                        name={props.name}
                        className={classnames({ reverse: iconPosition === "right" })}
                        disabled={props.disabled || item.disabled}
                        checked={multiple ? formattedValue.indexOf(item.value) > -1 : formattedValue === item.value}
                        {...item}
                    />
                ))}
                {React.Children.map(props.children, (Child: React.ReactElement<ToggleSelectorItemProps>) => {
                    const childValue: string = Child?.props?.value;
                    return React.isValidElement<ToggleSelectorItemProps>(Child)
                        ? React.cloneElement<any>(Child, {
                              onChange: onSelectorChange,
                              multiple,
                              name: props.name,
                              className: classnames(Child.props.className, { reverse: iconPosition === "right" }),
                              disabled: props.disabled || Child?.props?.disabled,
                              checked: multiple ? formattedValue.indexOf(childValue) > -1 : formattedValue === childValue,
                          })
                        : Child;
                })}
            </FeedbackIndicator>
        </div>
    );
};
