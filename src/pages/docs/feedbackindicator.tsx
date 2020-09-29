import React from "react";
import Docs from "components/Docs";
import { loremIpsum } from "lorem-ipsum";
import { FeedbackIndicator } from "@sebgroup/react-components/FeedbackIndicator";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";

const FeedbackIndicatorPage: React.FC = () => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/FeedbackIndicator/FeedbackIndicator");
    const typeList: Array<DynamicFormOption> = [
        { label: "no indicator message", value: "default", key: "default" },
        { label: "danger", value: "danger", key: "danger" },
        { label: "success", value: "success", key: "success" },
        { label: "warning", value: "warning", key: "warning" },
    ];
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                {
                    key: "message",
                    value: "Indicator message",
                    label: "Message",
                    placeholder: "Message",
                    controlType: "Text",
                },
                {
                    key: "type",
                    value: typeList[0],
                    label: "Type",
                    options: typeList,
                    controlType: "Dropdown",
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const code: string = `<FeedbackIndicator toggle={toggle}>text</FeedbackIndicator>`;

    return (
        <Docs
            mainFile={importString}
            example={
                <FeedbackIndicator type={(controls as any)?.type.value} message={(controls as any)?.message}>
                    <div>content children</div>
                </FeedbackIndicator>
            }
            code={code}
            controls={renderForm()}
        />
    );
};

export default FeedbackIndicatorPage;
