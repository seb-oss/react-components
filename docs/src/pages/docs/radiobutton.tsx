import React, { useEffect } from "react";
import Docs from "@common/Docs";
import { DynamicFormOption, useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import { RadioButton, RadioGroup } from "@sebgroup/react-components/RadioButton";
import { CodeSnippet } from "@common/CodeSnippet";
import { Indicator, IndicatorType } from "@sebgroup/react-components/FeedbackIndicator";

const importString: string = require("!raw-loader!@sebgroup/react-components/RadioButton/RadioButton");
const code: string = `{/* Use them in our RadioGroup helper component */}
<RadioGroup name="test-group" value={value} onChange={(e) => setValue(e.target.value)}>
    <RadioButton value="Yes">Yes</RadioButton>
    <RadioButton value="No">No</RadioButton>
    <RadioButton value="Maybe">Maybe</RadioButton>
</RadioGroup>

{/* Use them individually */}
<RadioButton name="group-name" value="Yes" checked={value === "Yes"} onChange={(e) => setValue(e.target.value)}>Yes</RadioButton>
<RadioButton name="group-name" value="No" checked={value === "No"} onChange={(e) => setValue(e.target.value)}>No</RadioButton>
<RadioButton name="group-name" value="Maybe" checked={value === "Maybe"} onChange={(e) => setValue(e.target.value)}>Maybe</RadioButton>`;

const indicators: Array<DynamicFormOption<IndicatorType>> = [
    { key: "error", label: "danger", value: "danger", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "success", label: "success", value: "success", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "warning", label: "warning", value: "warning", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
];

const indicatorGrouping: Array<DynamicFormOption> = [
    { key: "individual", label: "Individual", value: "1", description: "Pass an indicator to individual radio buttons" },
    { key: "grouped", label: "Grouped", value: "2", description: "Pass an indicator to a RadioGroup or wrap a group of radio buttons with a FeedbackIndicator" },
];

const RadioButtonPage: React.FC = () => {
    const [value, setValue] = React.useState<React.ReactText>("Yes");

    const {
        renderForm: renderControls,
        state: { controls },
        setHidden,
    } = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "inline", label: "inline", controlType: "Checkbox", initialValue: false, description: "Displays them inline" },
                { key: "disabled", label: "disabled", controlType: "Checkbox", initialValue: false },
                { key: "indicator", label: "indicator", controlType: "Checkbox", initialValue: false },
                {
                    key: "indicatorGrouping",
                    label: "Indicator choices",
                    controlType: "Radio",
                    options: indicatorGrouping,
                    initialValue: indicatorGrouping[0].value,
                },
                {
                    key: "indicatorType",
                    label: "Indicator type",
                    controlType: "Radio",
                    options: indicators,
                    initialValue: indicators[0].value,
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
        return controls.indicator ? { type: controls.indicatorType as IndicatorType, message: "Indicator message" } : null;
    }, [controls.indicator, controls.indicatorType]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100">
                    <RadioGroup
                        name="test-group"
                        label="Element label"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={!!controls?.disabled}
                        indicator={isGrouped ? indicator : null}
                    >
                        <RadioButton value="Yes" wrapperProps={controls.inline ? { className: "d-inline-block" } : {}} indicator={isIndividual ? indicator : null}>
                            Yes
                            <p className="text-muted m-0">Express yourself here</p>
                        </RadioButton>
                        <RadioButton value="No" wrapperProps={controls.inline ? { className: "d-inline-block" } : {}}>
                            No
                        </RadioButton>
                        <RadioButton value="Maybe" wrapperProps={controls.inline ? { className: "d-inline-block" } : {}}>
                            Maybe
                        </RadioButton>
                    </RadioGroup>
                </div>
            }
            code={code}
            controls={renderControls()}
            note={
                <>
                    <h4>Radio group</h4>
                    <p>
                        We have exported a helper component that makes it easy for you to compose a radio group. The component is name <code>RadioGroup</code>. You can apply group level properties
                        like <code>indicator</code> or <code>disabled</code>
                    </p>

                    <br />

                    <h4>Radio buttons with description</h4>
                    <p>
                        Radio buttons can sometimes be rendered with a description, in order to do that, you can simply render a <code>p</code> tag as children. It will look something like this:
                    </p>
                    <CodeSnippet className="card" language="jsx">
                        {`<RadioButton>
    Label
    <p className="text-muted m-0">Description here</p>
</RadioButton>`}
                    </CodeSnippet>
                </>
            }
        />
    );
};

export default RadioButtonPage;
