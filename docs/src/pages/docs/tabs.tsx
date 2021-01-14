import React from "react";
import Docs from "@common/Docs";
import { Tabs, TabItem } from "@sebgroup/react-components/Tabs";

const importString: string = require("!raw-loader!@sebgroup/react-components/Tabs/Tabs");
const code: string = `<Tabs value={value} onTabChange={setValue}>
    <TabItem>First</TabItem>
    <TabItem>Second</TabItem>
    <TabItem>Third</TabItem>
</Tabs>`;

const TabsPage: React.FC = React.memo(() => {
    const [value, setValue] = React.useState<number>(0);

    return (
        <Docs
            mainFile={importString}
            example={
                <Tabs value={value} onTabChange={setValue}>
                    <TabItem>First</TabItem>
                    <TabItem>Second</TabItem>
                    <TabItem>Third</TabItem>
                    <TabItem disabled>Fourth</TabItem>
                </Tabs>
            }
            code={code}
        />
    );
});

export default TabsPage;
