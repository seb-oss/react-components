import React from "react";
import TabItem, { TabItemProps } from "./TabItem";
import classnames from "classnames";
import "./tabs-style.scss";

export type TabsProps = Omit<JSX.IntrinsicElements["div"], "onClick"> & {
    /** index of focsued tab */
    activeTab: number;
    /** List of tab list item */
    list: Array<TabItemProps>;
    /** callback on tab item clicked */
    onClick: (index: number) => any;
};
/** Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy. */
export const Tabs: React.FC<TabsProps> = ({ activeTab, list, onClick, ...props }: TabsProps) => {
    const elementRefAnchors: Array<HTMLAnchorElement> = [];

    /**
     * Handles on tab click event
     * @param {React.MouseEvent<HTMLAnchorElement>} e Click event
     * @param {number} index The index of the tab clicked
     */
    function onTabClick(e: React.MouseEvent<HTMLAnchorElement>, index: number): void {
        if (onClick && !list[index].disabled) {
            onClick(index);
        }
    }

    /**
     * Handle on keydown event to support accessibility
     * @param {React.KeyboardEvent<HTMLAnchorElement>} e Key down event
     */
    function onKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>, index: number): void {
        if (activeTab < list.length && activeTab >= 0) {
            const previousTabIsEnabled = list[activeTab - 1] && !list[activeTab - 1].disabled;
            let selectedHtml: HTMLElement;
            if ((e.key.toLowerCase() === "arrowleft" || e.key.toLowerCase() === "arrowdown") && previousTabIsEnabled && onClick) {
                selectedHtml = elementRefAnchors[activeTab - 1];
                onClick(activeTab - 1);
            } else if ((e.key.toLowerCase() === "arrowright" || e.key.toLowerCase() === "arrowup") && !list[activeTab + 1].disabled && onClick) {
                selectedHtml = elementRefAnchors[activeTab + 1];
                onClick(activeTab + 1);
            } else if (e.key.toLowerCase() === "enter" || e.key === " " || e.key.toLowerCase() === "space") {
                selectedHtml = elementRefAnchors[activeTab];
                onClick(index);
            }
            selectedHtml?.focus();
        }
    }

    return (
        <div className={classnames("custom-tabs", props.className)} {...props}>
            <ul className="nav nav-tabs" role="tablist" aria-label="tabs">
                {list?.map((item: TabItemProps, index: number) => (
                    <TabItem
                        {...item}
                        key={index}
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => onTabClick(e, index)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => onKeyDown(e, index)}
                        role="tab"
                        isActive={index === activeTab}
                        ref={(refElement: HTMLAnchorElement) => {
                            elementRefAnchors[index] = refElement;
                        }}
                    />
                ))}
                {React.Children.map(props.children, (Child: React.ReactElement<TabItemProps>, index: number) => {
                    return React.isValidElement<React.FC<TabItemProps>>(Child)
                        ? React.cloneElement<any>(Child, {
                              isActive: index === activeTab,
                              ref: (refElement: HTMLAnchorElement) => {
                                  elementRefAnchors[index] = refElement;
                              },
                              onClick: (e: React.MouseEvent<HTMLAnchorElement>) => onTabClick(e, index),
                              onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>) => onKeyDown(e, index),
                          })
                        : Child;
                })}
            </ul>
        </div>
    );
};
