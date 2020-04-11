import * as React from "react";
import { Tabs, TabsListItem } from "../../../src/Tabs/Tabs";
import Highlight from "react-highlight";
const docMD = require("../../../src/Tabs/readme.md");

const TabsPage: React.FunctionComponent = () => {
    const [activeTab, setActiveTab] = React.useState<number>(0);

    return (
        <div className="route-template container">
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
                        <Tabs list={tabList} activeTab={activeTab} onClick={(index: number) => setActiveTab(index)} />
                        <div className="content">{activeTab >= 0 && <p>{tabContent[activeTab]}</p>}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const tabList: Array<TabsListItem> = [{ text: "First" }, { text: "Second" }, { text: "Third" }, { text: "Fourth", disabled: true }];
const tabContent: Array<string> = ["First tab content", "Second tab content", "Third tab content", "Fourth tab content"];

export default TabsPage;
