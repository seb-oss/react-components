import * as React from "react";
import "./tabs-style.scss";

export interface TabsListItem {
    text: string;
    disabled?: boolean;
}

interface TabsProps {
    list: Array<TabsListItem>;
    activeTab: number;
    onClick?: (index: number) => any;
    className?: string;
}

const Tabs: React.FunctionComponent<TabsProps> = (props: TabsProps) => {
    const elementRefAnchor: Array<HTMLAnchorElement> = [];

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
    function onKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>): void {
        if (props.activeTab < props.list.length && props.activeTab >= 0) {
            const previousTabIsEnabled = props.list[props.activeTab - 1] && !props.list[props.activeTab - 1].disabled;
            if ((e.key.toLowerCase() === "arrowleft" || e.key.toLowerCase() === "arrowdown") && previousTabIsEnabled && props.onClick) {
                const selectedHtml: HTMLElement = elementRefAnchor[props.activeTab - 1];
                selectedHtml.setAttribute("aria-selected", "true");
                selectedHtml.setAttribute("tabIndex", "0");
                selectedHtml.setAttribute("class", "nav-link active");
                selectedHtml.focus();

                props.onClick(props.activeTab - 1);
            } else if ((e.key.toLowerCase() === "arrowright" || e.key.toLowerCase() === "arrowup") && !props.list[props.activeTab + 1].disabled && props.onClick) {
                const selectedHtml: HTMLElement = elementRefAnchor[props.activeTab + 1];
                selectedHtml.setAttribute("aria-selected", "true");
                selectedHtml.setAttribute("tabIndex", "0");
                selectedHtml.setAttribute("class", "nav-link active");
                selectedHtml.focus();
                props.onClick(props.activeTab + 1);
            }
        }
    }

    /**
     * Sets the index of the selected tab
     * @param {number} index The index of the tab to be set
     */
    function setTabIndex(index: number): number {
        return Math.floor(props.activeTab) === (index) ? 0 : -1;
    }

    return (
        <div className={"custom-tabs" + (props.className ? ` ${props.className}` : "")}>
            <ul className="nav nav-tabs" role="tablist" aria-label="tabs">
                {props.list.map((item: TabsListItem, index: number) =>
                    <li
                        key={index}
                        className={"nav-item" + (index === props.activeTab ? " active" : "") + (item.disabled ? " disabled" : "")}
                    >
                        <a
                            className={"nav-link" + (index === props.activeTab ? " active" : "") + (item.disabled ? " disabled" : "")}
                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => onClick(e, index)}
                            role="tab"
                            aria-selected={index === props.activeTab}
                            aria-controls={`link-${item.text}`}
                            onKeyDown={onKeyDown}
                            ref={(refElement: HTMLAnchorElement) => { elementRefAnchor[index] = refElement; }}
                        >
                            {item.text}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
};

export { Tabs };
