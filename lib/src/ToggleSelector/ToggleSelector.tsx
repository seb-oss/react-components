import React from "react";
import classnames from "classnames";
import "./toggle-selector.scss";

export interface ToggleSelectorItem {
    label: React.ReactNode;
    icon?: React.ReactNode;
    value: string;
    disabled?: boolean;
}

export interface FormattedToggleSelectorItem extends ToggleSelectorItem {
    checked: boolean;
}

export type ToggleSelectorProps = Omit<JSX.IntrinsicElements["input"], "value" | "list" | "onChange"> & {
    list: Array<ToggleSelectorItem>;
    /** Div wrapper props */
    wrapperProps?: JSX.IntrinsicElements["div"];
    value?: Array<ToggleSelectorItem> | ToggleSelectorItem;
    onChange: (value: Array<ToggleSelectorItem> | ToggleSelectorItem) => void;
    multiple?: boolean;
    className?: string;
    id?: string;
};

export const ToggleSelector: React.FC<ToggleSelectorProps> = ({ list, multiple, className, id, wrapperProps, value, onChange, ...props }: ToggleSelectorProps) => {
    const [formattedList, setFormattedList] = React.useState<Array<FormattedToggleSelectorItem>>([]);

    const formatList = (newValue: ToggleSelectorItem | Array<ToggleSelectorItem>) => {
        setFormattedList(
            list.map((item: ToggleSelectorItem) => {
                const checked: boolean = multiple
                    ? (newValue as Array<ToggleSelectorItem>)?.some((valueItem: ToggleSelectorItem) => valueItem.value === item.value)
                    : (newValue as ToggleSelectorItem).value === item.value;
                return { ...item, checked };
            })
        );
    };

    const onButtonClick = (selectedIndex: number) => {
        let newValue: ToggleSelectorItem | Array<ToggleSelectorItem> = multiple ? [...(value as Array<ToggleSelectorItem>)] : { ...value };
        const selectedValue: FormattedToggleSelectorItem = formattedList[selectedIndex];
        if (selectedValue.disabled || props.disabled) {
            return;
        }
        if (multiple) {
            newValue = formattedList
                .filter((item: FormattedToggleSelectorItem) => {
                    return item.value === selectedValue.value ? !selectedValue.checked : item.checked;
                })
                .map(({ label, value }: FormattedToggleSelectorItem) => ({ label, value }));
        } else if ((value as ToggleSelectorItem).value !== selectedValue.value) {
            newValue = { ...list[selectedIndex] };
        }
        formatList(newValue);
        onChange(newValue);
    };

    React.useEffect(() => {
        formatList(value);
    }, [list, value]);

    return (
        <div className={classnames("rc toggle-selector", className)} id={id} {...wrapperProps}>
            {formattedList?.map((item: FormattedToggleSelectorItem, index: number) => (
                <button
                    key={index}
                    onClick={() => onButtonClick(index)}
                    className={classnames("btn btn-outline-primary btn-block", { checked: item.checked, disabled: item.disabled || props.disabled })}
                >
                    <input id={item.value} type={multiple ? "checkbox" : "radio"} readOnly checked={item.checked} value={item.value} {...props} />
                    {item.icon && <div className="svg-holder">{item.icon}</div>}
                    <div className="label-container">{item.label}</div>
                </button>
            ))}
        </div>
    );
};
