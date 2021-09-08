import React from "react";
import { TabItemProps } from "./TabItem";
import classnames from "classnames";

export type TabsProps = JSX.IntrinsicElements["ul"] & {
    /** Index of focsued tab */
    value?: number;
    /** Callback on tab item changed */
    onTabChange?: (index: number) => void;
};
/** Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy. */
export const Tabs: React.FC<TabsProps> = React.forwardRef(({ value, onTabChange, ...props }: TabsProps, ref: React.ForwardedRef<HTMLUListElement>) => {
    const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.currentTarget.href.endsWith("#") && event.preventDefault();
        onTabChange && onTabChange(parseInt(event.currentTarget.dataset.indexNumber));
    };

    return (
        <ul {...props} ref={ref} className={classnames("rc nav nav-tabs", props.className)} role={props.role || "tablist"}>
            {React.Children.map(props.children, (Child: React.ReactElement<TabItemProps>, index: number) => {
                return React.isValidElement<React.FC<TabItemProps>>(Child)
                    ? React.cloneElement<any>(Child, {
                          active: index === value,
                          onClick,
                          "data-index-number": index,
                      })
                    : Child;
            })}
        </ul>
    );
});
