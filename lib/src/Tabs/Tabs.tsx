import React from "react";
import TabItem, { TabItemProps } from "./Tab";
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
export const Tabs: React.FC<TabsProps> = ({ activeTab, list, ...props }: TabsProps) => {
    const elementRefAnchors: Array<HTMLAnchorElement> = [];

    /**
     * Handles on tab click event
     * @param {React.MouseEvent<HTMLAnchorElement>} e Click event
     * @param {number} index The index of the tab clicked
     */
    function onClick(e: React.MouseEvent<HTMLAnchorElement>, index: number): void {
        if (props.onClick && !list[index].disabled) {
            props.onClick(index);
        }
    }

    /**
     * Handle on keydown event to support accessibility
     * @param {React.KeyboardEvent<HTMLAnchorElement>} e Key down event
     */
    function onKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>, index: number): void {
        if (activeTab < list.length && activeTab >= 0) {
            const previousTabIsEnabled = list[activeTab - 1] && !list[activeTab - 1].disabled;
            if ((e.key.toLowerCase() === "arrowleft" || e.key.toLowerCase() === "arrowdown") && previousTabIsEnabled && props.onClick) {
                props.onClick(activeTab - 1);
            } else if ((e.key.toLowerCase() === "arrowright" || e.key.toLowerCase() === "arrowup") && !list[activeTab + 1].disabled && props.onClick) {
                props.onClick(activeTab + 1);
            } else if (e.key.toLowerCase() === "enter" || e.key === " " || e.key.toLowerCase() === "space") {
                props.onClick(index);
            }
        }
    }

    React.useEffect(() => {
        if (elementRefAnchors.length > 0) {
            const selectedHtml: HTMLElement = elementRefAnchors[activeTab];
            selectedHtml?.focus();
        }
    }, [activeTab]);

    return (
        <div className={"custom-tabs" + (props.className ? ` ${props.className}` : "")} id={props.id}>
            <ul className="nav nav-tabs" role="tablist" aria-label="tabs">
                {list?.map((item: TabItemProps, index: number) => (
                    <TabItem
                        {...item}
                        key={index}
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => onClick(e, index)}
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
                              onClick: (e: React.MouseEvent<HTMLAnchorElement>) => onClick(e, index),
                              onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>) => onKeyDown(e, index),
                          })
                        : Child;
                })}
            </ul>
        </div>
    );
};
