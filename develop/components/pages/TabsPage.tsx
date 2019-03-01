import * as React from "react";
import { Tabs, TabsListItem } from "../../../src/Tabs/Tabs";
import { getParameterByName } from "../../utils/queryString";
const Highlight = (require("react-highlight")).default;
const docMD = require("../../../src/Tabs/readme.md");

interface TabsPageState {
    tabsList: Array<TabsListItem>;
    activeTab: number;
}

export default class TabsPage extends React.Component<any, TabsPageState>  {
    constructor(props: any) {
        super(props);

        this.state = {
            tabsList: [
                { text: "First" },
                { text: "Second" },
                { text: "Third" },
                { text: "Fourth", disabled: true },
            ],
            activeTab: 0
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(index: number): void {
        this.setState({ activeTab: index });
    }

    render() {
        const mode = getParameterByName(this.props.location.search, "mode");
        return (
            <div className={"route-template " + ((mode === "dl" || mode === "DL") ? "brief" : "")}>
                <div className="info-holder">

                    <div className="info">
                        <div className="md-file">
                            <Highlight innerHTML={true}>{docMD}</Highlight>
                        </div>
                    </div>

                    <div className="info">
                        <h2>Output</h2>
                        <p>Here are sample outputs</p>
                        <div className="result wide">
                            <Tabs
                                list={this.state.tabsList}
                                activeTab={this.state.activeTab}
                                onClick={this.onClick}
                            />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}
