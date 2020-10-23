import React from "react";
import classnames from "classnames";
import ToggleSelectorItem, { SelectedToggleSelectorItemProps, ToggleSelectorItemComponent, ToggleSelectorItemProps } from "./ToggleSelectorItem";
import "./toggle-selector.scss";

export type ToggleSelectorProps = Omit<JSX.IntrinsicElements["div"], "onChange"> & {
    children: React.ReactNode;
    list?: Array<ToggleSelectorItemProps>;
    multiple?: boolean;
    value: string | Array<string>;
    name: string;
    onChange: (value: string | Array<string>) => void;
};

type ToggleSelector = React.FC<ToggleSelectorProps> & { ToggleSelectorItem: ToggleSelectorItemComponent };

export const ToggleSelector: ToggleSelector = ({ className, list, multiple, value, onChange, ...props }: ToggleSelectorProps) => {
    const [formattedValue, setFormattedValue] = React.useState<string | Array<string>>(value);

    const updateValue = (valueList: string | Array<string>, selectedChildProps: ToggleSelectorItemProps, event: React.ChangeEvent<HTMLInputElement>) => {
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
    };

    const formatList = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue: string = event.target.value;
        const checked: boolean = event.target.checked;
        let newValue: string | Array<string> = multiple ? [...(value as Array<string>)] : null;
        if (list) {
            list.map((item: ToggleSelectorItemProps) => {
                newValue = updateValue(newValue, item, event);
            });
        } else {
            React.Children.map(props.children, (Child: React.ReactElement<ToggleSelectorItemProps>, i: number) => {
                const childProps: ToggleSelectorItemProps = Child.props;
                newValue = updateValue(newValue, childProps, event);
            });
        }
        setFormattedValue(newValue);
        onChange(newValue);
    };
    const onChildrenClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked);
        formatList(event);
    };

    // React.useEffect
    return (
        <div className={classnames("rc toggle-selector", className)} {...props}>
            {list?.map((item: ToggleSelectorItemProps, i: number) => (
                <ToggleSelectorItem key={i} {...item} onChange={onChildrenClick} />
            ))}
            {React.Children.map(props.children, (Child: React.ReactElement<ToggleSelectorItemProps>, i: number) => {
                const childValue: string = Child?.props?.value;
                return React.isValidElement<ToggleSelectorItemProps>(Child)
                    ? React.cloneElement<any>(Child, {
                          onChange: onChildrenClick,
                          multiple,
                          name: props.name,
                          checked: multiple ? formattedValue.indexOf(childValue) > -1 : formattedValue === childValue,
                      })
                    : Child;
            })}
        </div>
    );
};

ToggleSelector.ToggleSelectorItem = ToggleSelectorItem;
