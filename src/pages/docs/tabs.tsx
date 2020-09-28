import React from "react";
import Docs from "components/Docs";
import { DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";
import { Tabs, TabsListItem } from "@sebgroup/react-components/Tabs";

const TabsPage: React.FC = React.memo(() => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Tabs/Tabs");
    const tabList: Array<TabsListItem> = [{ text: "First" }, { text: "Second" }, { text: "Third" }, { text: "Forth", disabled: true }];
    const [value, setValue] = React.useState<number>(0);
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                {
                    key: "active",
                    value: value,
                    min: 0,
                    max: 3,
                    label: "Active index",
                    controlType: "Stepper",
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const code: string = `<Tabs list={[]} activeTab={0} onClick={null} />`;

    React.useEffect(() => {
        setValue((controls as any)?.active);
    }, [(controls as any)?.active]);

    return <Docs mainFile={importString} example={<Tabs list={tabList} activeTab={value} onClick={setValue} />} code={code} controls={renderForm()} />;
});

export default TabsPage;
