import React from "react";
import Docs from "@common/Docs";
import { Checkbox } from "@sebgroup/react-components/Checkbox/Checkbox";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { FeedbackIndicator, Indicator, IndicatorType } from "@sebgroup/react-components/FeedbackIndicator";
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

const indicatorGrouping: Array<DynamicFormOption> = [
    { key: "individual", label: "Individual", value: "1", description: "Pass an indicator to individual checkboxes" },
    { key: "grouped", label: "Grouped", value: "2", description: "Wrap a group of checkboxes with a FeedbackIndicator" },
];

const CheckboxPage: React.FC = (): React.ReactElement<void> => {
    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "inline", label: "inline", controlType: "Checkbox", value: false },
                { key: "indicator", label: "indicator", controlType: "Checkbox", value: false },
                { key: "indicatorType", rulerKey: "indicator", condition: true, label: "Indicator type", options: indicators, inline: true, controlType: "Radio", value: indicators[0], indent: true },
                {
                    key: "indicatorGrouping",
                    label: "Indicator choices",
                    controlType: "Radio",
                    rulerKey: "indicator",
                    condition: true,
                    options: indicatorGrouping,
                    value: indicatorGrouping[0],
                    indent: true,
                },
            ],
        },
    ]);

    const isIndividual: boolean = controls.indicatorGrouping?.value === "1";
    const isGrouped: boolean = controls.indicatorGrouping?.value === "2";
    const indicator: Indicator = controls.indicator ? { type: controls.indicatorType?.value, message: "Indicator message" } : null;

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100">
                    <FeedbackIndicator type={isGrouped ? indicator?.type : null} message={isGrouped ? indicator?.message : null}>
                        <Checkbox inline={controls.inline} indicator={isIndividual ? indicator : null}>
                            First
                            <p className="text-muted m-0">Express yourself here</p>
                        </Checkbox>
                        <Checkbox inline={controls.inline}>Second</Checkbox>
                    </FeedbackIndicator>
                </div>
            }
            code={code}
            controls={renderControls()}
            note={
                <>
                    <h4>Checkboxes with description</h4>
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
