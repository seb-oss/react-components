import React from "react";
import Docs from "components/Docs";
import { DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";
import { Tabs, TabItem } from "@sebgroup/react-components/Tabs";

const TabsPage: React.FC = React.memo(() => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Tabs/Tabs");
    const [active, setActive] = React.useState<number>(0);
    const [usePills, setUsePills] = React.useState<boolean>(false);
    const [renderControls, form, setForm] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "active",
                    value: active,
                    min: 0,
                    max: 3,
                    label: "Active index",
                    controlType: "Stepper",
                },
                {
                    key: "usePills",
                    value: false,
                    label: "Use pill style",
                    controlType: "Checkbox",
                },
            ],
        },
    ]);
    const code: string = `
<Tabs value={value} onValueChange={setValue}>
    <TabItem>First</TabItem>
    <TabItem>Second</TabItem>
    <TabItem>Third</TabItem>
    <TabItem disabled>Fourth</TabItem>
</Tabs>
`;

    React.useEffect(() => setActive(form.controls.active), [form.controls.active]);

    React.useEffect(() => {
        if (active !== form.controls.active) {
            setForm({ ...form, controls: { active } });
        }
    }, [active]);

    return (
        <Docs
            mainFile={importString}
            example={
                <Tabs value={form.controls.active} onValueChange={setActive} usePills={form.controls.usePills}>
                    <TabItem>First</TabItem>
                    <TabItem>Second</TabItem>
                    <TabItem>Third</TabItem>
                    <TabItem disabled>Fourth</TabItem>
                </Tabs>
            }
            code={code}
            controls={renderControls()}
        />
    );
});

export default TabsPage;
