import React from "react";
import classnames from "classnames";

export interface ToggleSelectorItem {
    label: React.ReactNode;
    icon?: React.ReactNode;
    value: string;
}

export type ToggleSelectorProps = JSX.IntrinsicElements["input"] & {
    list: Array<ToggleSelectorItem>;
    /** Div wrapper props */
    wrapperProps?: JSX.IntrinsicElements["div"];
};

export const ToggleSelector: React.FC<ToggleSelectorProps> = ({ list, multiple, className, id, wrapperProps, ...props }: ToggleSelectorProps) => {
    return (
        <div className={classnames("rc", className)} id={id} {...wrapperProps}>
            {list?.map((item: ToggleSelectorItem, index: number) => {
                <div key={index} className="item-wrapper">
                    <input id={item.value} type={multiple ? "checkbox" : "radio"} value={item.value} {...props} />
                    {/* selector here */}
                </div>;
            })}
        </div>
    );
};
