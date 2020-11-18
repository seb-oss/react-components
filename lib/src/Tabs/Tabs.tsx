import React from "react";
import TabItem, { TabItemProps } from "./TabItem";
import classnames from "classnames";
import "./tabs-style.scss";

export type TabsProps = Omit<JSX.IntrinsicElements["div"], "onClick"> & {
    /** index of focsued tab */
    activeTab: number;
    /** List of tab list item */
    list?: Array<TabItemProps>;
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
        onClick && onClick(index);
    }

    /**
     * Handle on keydown event to support accessibility
     * @param {React.KeyboardEvent<HTMLAnchorElement>} e Key down event
     */
    function onKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>, index: number): void {
        if (activeTab < elementRefAnchors.length && activeTab >= 0) {
            let selectedHtml: HTMLElement;
            if ((e.key.toLowerCase() === "arrowleft" || e.key.toLowerCase() === "arrowdown") && activeTab > 0) {
                selectedHtml = elementRefAnchors[activeTab - 1];
                onClick(activeTab - 1);
            } else if (
                (e.key.toLowerCase() === "arrowright" || e.key.toLowerCase() === "arrowup") &&
                elementRefAnchors[activeTab + 1] &&
                elementRefAnchors[activeTab + 1].className.indexOf("disabled") === -1
            ) {
                selectedHtml = elementRefAnchors[activeTab + 1];
                onClick(activeTab + 1);
            } else if (e.key.toLowerCase() === "enter" || e.key === " " || e.key.toLowerCase() === "space") {
                selectedHtml = elementRefAnchors[index];
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
                              onClick: (e: React.MouseEvent<HTMLAnchorElement>) => (Child.props.disabled ? null : onTabClick(e, index)),
                              onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>) => (Child.props.disabled ? null : onKeyDown(e, index)),
                          })
                        : Child;
                })}
            </ul>
        </div>
    );
};
