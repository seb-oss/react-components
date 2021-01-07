import React from "react";
import Docs from "@common/Docs";
import { Checkbox } from "@sebgroup/react-components/Checkbox/Checkbox";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { FeedbackIndicator, IndicatorType } from "@sebgroup/react-components/FeedbackIndicator/FeedbackIndicator";
import { CodeSnippet } from "@common/CodeSnippet";

const importString: string = require("!raw-loader!@sebgroup/react-components/Checkbox/Checkbox");
const code: string = `<Checkbox>Label here</Checkbox>`;
const checkboxWithDescriptionCode: string = `<Checkbox>
    Your label here
    <p className="text-muted m-0">Explain yourself here</p>
</Checkbox>`;

const indicators: Array<DynamicFormOption<IndicatorType>> = [
    { key: "error", label: "danger", value: "danger" },
    { key: "success", label: "success", value: "success" },
    { key: "warning", label: "warning", value: "warning" },
];

const CheckboxPage: React.FC = (): React.ReactElement<void> => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "inline", label: "Inline", controlType: "Checkbox" },
                { key: "showIndicators", label: "Render with indicators", controlType: "Checkbox" },
                { key: "indicators", rulerKey: "showIndicators", condition: true, label: "Indicator type", options: indicators, inline: true, controlType: "Radio" },
                {
                    key: "indicatorType",
                    rulerKey: "showIndicators",
                    condition: true,
                    label: "Indicator structure",
                    description: "You can either pass an indicator to individual checkboxes or surround a group of checkboxes witha FeedbackIndicator component",
                    options: [
                        { key: "grouped", label: "Grouped", value: "grouped" },
                        { key: "individual", label: "Individually", value: "individual" },
                    ],
                    value: { key: "grouped", label: "Grouped", value: "grouped" },
                    inline: true,
                    controlType: "Radio",
                },
            ],
        },
    ]);

    const isIndividual: boolean = controls.indicatorType?.value === "individual";
    let indicatorMessage: string = controls.showIndicators ? controls.indicators?.label || "" : "";
    indicatorMessage += indicatorMessage ? " message" : "";

    return (
        <Docs
            mainFile={importString}
            example={
                <FeedbackIndicator type={controls.showIndicators && !isIndividual ? controls.indicators?.value : null} message={!isIndividual ? indicatorMessage : ""}>
                    <Checkbox inline={controls.inline} indicator={controls.showIndicators && isIndividual ? { type: controls.indicators?.value, message: indicatorMessage } : null}>
                        First
                        <p className="text-muted m-0">Express yourself here</p>
                    </Checkbox>
                    <Checkbox inline={controls.inline} indicator={controls.showIndicators && isIndividual ? { type: controls.indicators?.value, message: indicatorMessage } : null}>
                        Second
                    </Checkbox>
                </FeedbackIndicator>
            }
            code={code}
            controls={renderControls()}
            note={
                <>
                    <p>
                        Checkboxes can sometimes be rendered with a description, in order to do that, you can simply render a <code>p</code> tag as children. It will look something like this:
                    </p>

                    <CodeSnippet className="card" language="jsx">
                        {checkboxWithDescriptionCode}
                    </CodeSnippet>
                </>
            }
        />
    );
};

export default CheckboxPage;
