import React from "react";
import Docs from "@common/Docs";
import { Tabs } from "@sebgroup/react-components/Tabs";

const importString: string = require("!raw-loader!@sebgroup/react-components/Tabs/Tabs");
const code: string = `<Tabs value={value} onTabChange={setValue}>
    <Tabs.Item>First</Tabs.Item>
    <Tabs.Item>Second</Tabs.Item>
    <Tabs.Item>Third</Tabs.Item>
</Tabs>`;

const TabsPage: React.FC = React.memo(() => {
    const [value, setValue] = React.useState<number>(0);

    return (
        <Docs
            mainFile={importString}
            example={
                <Tabs value={value} onTabChange={setValue}>
                    <Tabs.Item>First</Tabs.Item>
                    <Tabs.Item>Second</Tabs.Item>
                    <Tabs.Item>Third</Tabs.Item>
                    <Tabs.Item disabled>Fourth</Tabs.Item>
                </Tabs>
            }
            code={code}
        />
    );
});

export default TabsPage;
