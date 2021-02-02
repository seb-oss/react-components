import React from "react";
import classnames from "classnames";

export type TabItemProps = JSX.IntrinsicElements["a"] & {
    /** Active state */
    active?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Wrapper props (li) */
    wrapperProps?: JSX.IntrinsicElements["li"];
};

export const TabItem: React.FC<TabItemProps> = React.forwardRef(({ wrapperProps = {}, active, disabled, ...props }: TabItemProps, ref: React.RefObject<HTMLAnchorElement>) => {
    return (
        <li {...wrapperProps} className={classnames("rc nav-item", wrapperProps.className)}>
            <a
                {...props}
                href={props.href || "#"}
                ref={ref}
                role="tab"
                tabIndex={0}
                aria-selected={active}
                aria-controls={props["aria-controls"] || `link-${props.id}`}
                className={classnames("nav-link", { active, disabled }, props.className)}
            />
        </li>
    );
});
