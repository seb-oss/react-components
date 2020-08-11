import * as React from "react";
import "./tabs-style.scss";

export interface TabsListItem {
    text: string;
    disabled?: boolean;
}

export interface TabsProps {
    activeTab: number;
    className?: string;
    id?: string;
    list: Array<TabsListItem>;
    onClick: (index: number) => any;
}

const Tabs: React.FunctionComponent<TabsProps> = (props: TabsProps) => {
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

export { Tabs };
