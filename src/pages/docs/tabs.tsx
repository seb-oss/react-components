import React from "react";
import Docs from "components/Docs";
import { DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";
import { Tabs } from "@sebgroup/react-components/Tabs";
import { TabItemProps } from "@sebgroup/react-components/Tabs/TabItem";

const TabsPage: React.FC = React.memo(() => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Tabs/Tabs");
    const tabList: Array<TabItemProps> = [{ label: "First" }, { label: "Second" }, { label: "Third" }, { label: "Forth", disabled: true }];
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
    const [renderForm, form, setForm] = useDynamicForm(fields);
    const code: string = `<Tabs list={[]} activeTab={0} onClick={null} />`;

    React.useEffect(() => {
        setValue((form.controls as any)?.active);
    }, [(form.controls as any)?.active]);

    React.useEffect(() => {
        if (value !== form.controls.active) {
            setForm({
                ...form,
                controls: {
                    active: value,
                },
            });
        }
    }, [value]);

    return <Docs mainFile={importString} example={<Tabs list={tabList} activeTab={value} onClick={setValue} />} code={code} controls={renderForm()} />;
});

export default TabsPage;
