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

interface TabsState {
    localActiveTab: number;
}

export class Tabs extends React.Component<TabsProps, any> {
    elementRefAnchor: Array<HTMLAnchorElement> = [];

    constructor(props: TabsProps) {
        super(props);
        this.state = {
            localActiveTab: props.activeTab
        };

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e: React.MouseEvent<HTMLAnchorElement>, item: TabsListItem, i: number): void {
        if (this.props.onClick && !item.disabled) {
            console.log("Its been called ", item);
            this.props.onClick(i);
        }
    }

    /**
     * e: Event
     */
    onKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>) {
        console.log("The key ", this.props.list);
        console.log("The localActive tab is ",
            (e.key.toLowerCase() === "arrowright" || e.key.toLowerCase() === "arrowup") && !this.props.list[this.state.localActiveTab + 1].disabled && this.props.onClick);
        if (this.state.localActiveTab < this.props.list.length && this.state.localActiveTab >= 0) {
            const previousTabIsEnabled = this.props.list[this.state.localActiveTab - 1] && !this.props.list[this.state.localActiveTab - 1].disabled;
            if ((e.key.toLowerCase() === "arrowleft" || e.key.toLowerCase() === "arrowdown") && previousTabIsEnabled && this.props.onClick) {
                console.log("the right clcik is ", this.state.localActiveTab);
                const selectedHtml: HTMLElement = this.elementRefAnchor[this.state.localActiveTab - 1];
                selectedHtml.setAttribute("aria-selected", "true");
                selectedHtml.setAttribute("tabIndex", "0");
                selectedHtml.setAttribute("class", "nav-link active");
                selectedHtml.focus();

                this.props.onClick(this.state.localActiveTab - 1);
                this.setState({ localActiveTab: this.state.localActiveTab - 1 });
            } else if ((e.key.toLowerCase() === "arrowright" || e.key.toLowerCase() === "arrowup") && !this.props.list[this.state.localActiveTab + 1].disabled && this.props.onClick) {
                console.log("Its copming to the right now ");
                const selectedHtml: HTMLElement = this.elementRefAnchor[this.state.localActiveTab + 1];
                selectedHtml.setAttribute("aria-selected", "true");
                selectedHtml.setAttribute("tabIndex", "0");
                selectedHtml.setAttribute("class", "nav-link active");
                selectedHtml.focus();
                console.log("kaka tazo nan ", this.state.localActive);
                this.props.onClick(this.state.localActiveTab + 1);
                this.setState({ localActiveTab: this.state.localActiveTab + 1 });
            }
        }
    }

    /**
     *
     * @param i index
     */
    setTabIndex(i: number): number {
        return Math.floor(this.state.localActiveTab) === (i) ? 0 : -1;
    }

    componentDidUpdate(prevProps: TabsProps) {
        if (this.props.activeTab !== prevProps.activeTab) {
            this.setState({ localActiveTab: this.props.activeTab });
        }
    }

    render() {
        return (
            <div className={"custom-tabs" + (this.props.className ? ` ${this.props.className}` : "")}>
                <ul className="nav nav-tabs" role="tablist" aria-label="tabs">
                    {this.props.list.map((item: TabsListItem, i: number) =>
                        <li
                            key={i}
                            className={"nav-item" + (i === this.state.localActiveTab ? " active" : "") + (item.disabled ? " disabled" : "")}
                        >
                            <a
                                className={"nav-link" + (i === this.state.localActiveTab ? " active" : "") + (item.disabled ? " disabled" : "")}
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => this.onClick(e, item, i)}
                                role="tab"
                                tabIndex={this.setTabIndex(i)}
                                aria-selected={i === this.state.localActiveTab}
                                aria-controls={`link-${item.text}`}
                                onKeyDown={this.onKeyDown}
                                ref={(refElement: HTMLAnchorElement) => { this.elementRefAnchor[i] = refElement; }}
                            >
                                {item.text}
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        );

    }
}
