import React, { useEffect } from "react";
import Docs from "@common/Docs";
import { Checkbox } from "@sebgroup/react-components/Checkbox/Checkbox";
import { DynamicFormOption, useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import { FeedbackIndicator, Indicator, IndicatorType } from "@sebgroup/react-components/FeedbackIndicator";
import { CodeSnippet } from "@common/CodeSnippet";

const importString: string = require("!raw-loader!@sebgroup/react-components/Checkbox/Checkbox");
const code: string = `<Checkbox>Label here</Checkbox>`;
const checkboxWithDescriptionCode: string = `<Checkbox>
    Your label here
    <p className="text-muted m-0">Explain yourself here</p>
</Checkbox>`;

const indicators: Array<DynamicFormOption<IndicatorType>> = [
    { key: "error", label: "danger", value: "danger", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "success", label: "success", value: "success", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "warning", label: "warning", value: "warning", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
];

const indicatorGrouping: Array<DynamicFormOption> = [
    { key: "individual", label: "Individual", value: "1", description: "Pass an indicator to individual checkboxes" },
    { key: "grouped", label: "Grouped", value: "2", description: "Wrap a group of checkboxes with a FeedbackIndicator" },
];

const CheckboxPage: React.FC = (): React.ReactElement<void> => {
    const {
        renderForm: renderControls,
        state: { controls },
        setHidden,
    }: any = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "inline", label: "inline", controlType: "Checkbox", initialValue: false },
                { key: "indicator", label: "indicator", controlType: "Checkbox", initialValue: false },
                {
                    key: "indicatorType",
                    label: "Indicator type",
                    options: indicators,
                    controlType: "Radio",
                    initialValue: indicators[0].value,
                    formElementAdditionalProps: { className: "indent pl-3 pt-2" },
                },
                {
                    key: "indicatorGrouping",
                    label: "Indicator choices",
                    controlType: "Radio",
                    options: indicatorGrouping,
                    initialValue: indicatorGrouping[0].value,
                    formElementAdditionalProps: { className: "indent pl-3 pt-2" },
                },
            ],
        },
    ]);

    useEffect(() => {
        setHidden("controls", "indicatorType", !controls.indicator);
        setHidden("controls", "indicatorGrouping", !controls.indicator);
    }, [controls.indicator]);

    const isIndividual: boolean = controls.indicatorGrouping === "1";
    const isGrouped: boolean = controls.indicatorGrouping === "2";
    const indicator: Indicator = React.useMemo(() => {
        return controls.indicator ? { type: controls.indicatorType, message: "Indicator message" } : null;
    }, [controls.indicator, controls.indicatorType]);

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
