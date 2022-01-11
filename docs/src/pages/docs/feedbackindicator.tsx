import React from "react";
import Docs from "@common/Docs";
import { FeedbackIndicator, IndicatorType } from "@sebgroup/react-components/FeedbackIndicator";
import { DynamicFormOption, useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import { Checkbox } from "@sebgroup/react-components/Checkbox";
import { RadioButton } from "@sebgroup/react-components/RadioButton";

const importString: string = require("!raw-loader!@sebgroup/react-components/FeedbackIndicator/FeedbackIndicator");
const code: string = `<FeedbackIndicator toggle={toggle}>text</FeedbackIndicator>`;

const typeList: Array<DynamicFormOption<IndicatorType>> = [
    { label: "danger", value: "danger", key: "danger" },
    { label: "success", value: "success", key: "success" },
    { label: "warning", value: "warning", key: "warning" },
];

const FeedbackIndicatorPage: React.FC = () => {
    const {
        renderForm,
        state: { controls },
    } = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "message", initialValue: "Indicator message", label: "Message", placeholder: "Message", controlType: "Text" },
                { key: "noBorder", initialValue: false, label: "noBorder", controlType: "Checkbox" },
                { key: "type", initialValue: typeList[0].value, label: "Type", options: typeList, controlType: "Radio" },
            ],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100">
                    <FeedbackIndicator id="indicator" type={controls.type as IndicatorType} message={controls?.message} noBorder={controls.noBorder as boolean}>
                        <Checkbox aria-describedby="indicator" aria-invalid={(controls.type as IndicatorType) === "danger"}>
                            A Checkbox
                        </Checkbox>
                        <RadioButton aria-describedby="indicator" aria-invalid={(controls.type as IndicatorType) === "danger"}>
                            A Radio button
                        </RadioButton>
                        <div className="px-3 pb-2">Some content 🦾</div>
                    </FeedbackIndicator>
                </div>
            }
            code={code}
            controls={renderForm()}
        />
    );
};

export default FeedbackIndicatorPage;
