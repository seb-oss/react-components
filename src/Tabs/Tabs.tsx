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

export const Tabs: React.FunctionComponent<TabsProps> = React.memo((props: TabsProps): React.ReactElement<void> => {
    return (
        <div className={"custom-tabs" + (props.className ? ` ${props.className}` : "")}>
            <ul className="nav nav-tabs">
                {props.list.map((item: TabsListItem, i: number) =>
                    <li
                        key={i}
                        className={"nav-item" + (i === props.activeTab ? " active" : "") + (item.disabled ? " disabled" : "")}
                    >
                        <a
                            className={"nav-link" + (i === props.activeTab ? " active" : "") + (item.disabled ? " disabled" : "")}
                            onClick={() => { if (props.onClick && !item.disabled) { props.onClick(i); } }}
                        >
                            {item.text}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
});
