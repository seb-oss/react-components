import React from "react";
import Docs from "@common/Docs";
import { FeedbackIndicator } from "@sebgroup/react-components/FeedbackIndicator";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";

const importString: string = require("!raw-loader!@sebgroup/react-components/FeedbackIndicator/FeedbackIndicator");
const code: string = `<FeedbackIndicator toggle={toggle}>text</FeedbackIndicator>`;

const typeList: Array<DynamicFormOption> = [
    { label: "no indicator message", value: "default", key: "default" },
    { label: "danger", value: "danger", key: "danger" },
    { label: "success", value: "success", key: "success" },
    { label: "warning", value: "warning", key: "warning" },
];

const FeedbackIndicatorPage: React.FC = () => {
    const [renderForm, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "message", value: "Indicator message", label: "Message", placeholder: "Message", controlType: "Text" },
                { key: "type", value: typeList[0].value, label: "Type", options: typeList, controlType: "Dropdown" },
            ],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={
                <FeedbackIndicator type={controls?.type} message={controls?.message}>
                    <div>content children</div>
                </FeedbackIndicator>
            }
            code={code}
            controls={renderForm()}
        />
    );
};

export default FeedbackIndicatorPage;
