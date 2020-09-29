import React from "react";
import Docs from "components/Docs";
import { loremIpsum } from "lorem-ipsum";
import { Collapse } from "@sebgroup/react-components/Collapse";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";

const CollapsePage: React.FC = () => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Collapse/Collapse");
    const text: string = React.useMemo(() => loremIpsum({ units: "paragraph", count: 1 }), []);
    const defaultCheckboxControls: Array<DynamicFormOption> = [{ label: "Collapse toggle", value: "toggle", key: "toggle" }];
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                {
                    label: "Optional configurations",
                    key: "checkboxes",
                    value: defaultCheckboxControls,
                    controlType: "Option",
                    options: defaultCheckboxControls,
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const code: string = `<Collapse toggle={toggle} title="Collapse title" message="message" onDismiss={() => setToggle(false)} />`;

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };

    return (
        <Docs
            mainFile={importString}
            example={
                <Collapse toggle={checkSelectedKey("toggle")}>
                    <div>{text}</div>
                </Collapse>
            }
            code={code}
            controls={renderForm()}
        />
    );
};

export default CollapsePage;
