import React from "react";
import Docs from "@common/Docs";
import { Tabs, TabItem } from "@sebgroup/react-components/Tabs";
import { useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";

const importString: string = require("!raw-loader!@sebgroup/react-components/Tabs/Tabs");
const code: string = `<Tabs value={value} onTabChange={setValue}>
    <TabItem>First</TabItem>
    <TabItem>Second</TabItem>
    <TabItem>Third</TabItem>
</Tabs>`;

const TabsPage: React.FC = React.memo(() => {
    const [value, setValue] = React.useState<number>(0);

    const {
        renderForm,
        state: { controls },
    } = useDynamicForm([
        {
            key: "controls",
            items: [{ key: "autoSelectOnFocus", label: "Auto select on focus", controlType: "Checkbox" }],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={
                <Tabs value={value} onTabChange={setValue} autoSelectOnFocus={!!controls.autoSelectOnFocus} onTabDelete={(index: number) => console.log("on delete", index)}>
                    <TabItem>First</TabItem>
                    <TabItem>Second</TabItem>
                    <TabItem>Third</TabItem>
                    <TabItem disabled>Fourth</TabItem>
                </Tabs>
            }
            controls={renderForm()}
            code={code}
        />
    );
});

export default TabsPage;
