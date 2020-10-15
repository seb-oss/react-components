import React from "react";
import classnames from "classnames";
import { TabItem, TabItemProps } from ".";
import "./tabs-style.scss";

export type TabsProps = JSX.IntrinsicElements["ul"] & {
    /** Index of the active tab */
    value: number;
    /** Active tab change handler */
    onValueChange?: (index: number) => void;
    /** List of tab list item */
    list?: Array<TabItemProps>;
    /** Use pill style tabs */
    usePills?: boolean;
};

/** Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy. */
export const Tabs: React.FC<TabsProps> = React.memo(({ list, value, usePills, onValueChange, ...props }: TabsProps) => {
    const clickHandler = React.useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            console.log("Clicked");
            const newIndex: number = parseInt(e.currentTarget.dataset.index, 10);
            onValueChange && newIndex !== value && onValueChange(newIndex);
        },
        [onValueChange, value]
    );

    return (
        <ul
            {...props}
            className={classnames("nav", props.className, {
                "nav-tabs": !usePills,
                "nav-pills": usePills,
            })}
            role="tablist"
            aria-label="tabs"
        >
            {list?.map((item: TabItemProps, i: number) => (
                <TabItem key={i} {...item} defaultChecked={value === i} data-index={i} onItemClicked={clickHandler} />
            ))}
            {React.Children.map(props.children, (Child: React.ReactElement<TabItemProps>, i: number) => {
                return React.isValidElement<React.FC<TabItemProps>>(Child)
                    ? React.cloneElement<any>(Child, {
                          defaultChecked: value === i + (list?.length || 0),
                          onItemClicked: clickHandler,
                          "data-index": i + (list?.length || 0),
                      })
                    : Child;
            })}
        </ul>
    );
});
