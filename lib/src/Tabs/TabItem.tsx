import React from "react";
import classnames from "classnames";

export type TabItemProps = JSX.IntrinsicElements["a"] & {
    label: React.ReactNode;
    isActive?: boolean;
    disabled?: boolean;
    tabWrapperProps?: JSX.IntrinsicElements["li"];
};

const TabItem: React.FC<TabItemProps> = React.forwardRef(({ label, tabWrapperProps, isActive, disabled, ...props }: TabItemProps, ref: React.RefObject<HTMLAnchorElement>) => {
    return (
        <li {...tabWrapperProps} className={classnames("nav-item", { active: isActive, disabled: disabled })}>
            <a
                {...props}
                ref={ref}
                role="tab"
                tabIndex={0}
                aria-selected={isActive}
                aria-controls={props["aria-controls"] || `link-${props.id || label}`}
                className={classnames("nav-link", { active: isActive, disabled: disabled })}
            >
                {label}
            </a>
        </li>
    );
});

export default TabItem;
