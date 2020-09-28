import React from "react";
import "./tabs-style.scss";

export interface TabsListItem {
    /** list item text */
    text: string;
    /** list item is disabled if set to true */
    disabled?: boolean;
}

export interface TabsProps {
    /** index of focsued tab */
    activeTab: number;
    /** Element class name */
    className?: string;
    /** Element ID */
    id?: string;
    /** List of tab list item */
    list: Array<TabsListItem>;
    /** callback on tab item clicked */
    onClick: (index: number) => any;
}
/** Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy. */
export const Tabs: React.FC<TabsProps> = (props: TabsProps) => {
    const elementRefAnchors: Array<HTMLAnchorElement> = [];

    /**
     * Handles on tab click event
     * @param {React.MouseEvent<HTMLAnchorElement>} e Click event
     * @param {number} index The index of the tab clicked
     */
    function onClick(e: React.MouseEvent<HTMLAnchorElement>, index: number): void {
        if (props.onClick && !props.list[index].disabled) {
            props.onClick(index);
        }
    }

    /**
     * Handle on keydown event to support accessibility
     * @param {React.KeyboardEvent<HTMLAnchorElement>} e Key down event
     */
    function onKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>, index: number): void {
        if (props.activeTab < props.list.length && props.activeTab >= 0) {
            const previousTabIsEnabled = props.list[props.activeTab - 1] && !props.list[props.activeTab - 1].disabled;
            if ((e.key.toLowerCase() === "arrowleft" || e.key.toLowerCase() === "arrowdown") && previousTabIsEnabled && props.onClick) {
                const selectedHtml: HTMLElement = elementRefAnchors[props.activeTab - 1];
                selectedHtml.setAttribute("aria-selected", "true");
                selectedHtml.setAttribute("tabIndex", "0");
                selectedHtml.setAttribute("class", "nav-link active");
                selectedHtml.focus();
                props.onClick(props.activeTab - 1);
            } else if ((e.key.toLowerCase() === "arrowright" || e.key.toLowerCase() === "arrowup") && !props.list[props.activeTab + 1].disabled && props.onClick) {
                const selectedHtml: HTMLElement = elementRefAnchors[props.activeTab + 1];
                selectedHtml.setAttribute("aria-selected", "true");
                selectedHtml.setAttribute("tabIndex", "0");
                selectedHtml.setAttribute("class", "nav-link active");
                selectedHtml.focus();
                props.onClick(props.activeTab + 1);
            } else if (e.key.toLowerCase() === "enter" || e.key === " " || e.key.toLowerCase() === "space") {
                const selectedHtml: HTMLElement = elementRefAnchors[index];
                selectedHtml.setAttribute("aria-selected", "true");
                selectedHtml.setAttribute("tabIndex", "0");
                selectedHtml.setAttribute("class", "nav-link active");
                selectedHtml.focus();
                props.onClick(index);
            }
        }
    }

    return (
        <div className={"custom-tabs" + (props.className ? ` ${props.className}` : "")} id={props.id}>
            <ul className="nav nav-tabs" role="tablist" aria-label="tabs">
                {props.list &&
                    props.list.map((item: TabsListItem, index: number) => (
                        <li key={index} className={"nav-item" + (index === props.activeTab ? " active" : "") + (item.disabled ? " disabled" : "")}>
                            <a
                                className={"nav-link" + (index === props.activeTab ? " active" : "") + (item.disabled ? " disabled" : "")}
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => onClick(e, index)}
                                onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => onKeyDown(e, index)}
                                role="tab"
                                aria-selected={index === props.activeTab}
                                aria-controls={`link-${item.text}`}
                                ref={(refElement: HTMLAnchorElement) => {
                                    elementRefAnchors[index] = refElement;
                                }}
                                tabIndex={0}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
