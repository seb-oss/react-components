import React from "react";
import Docs from "@common/Docs";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { RadioButton, RadioGroup } from "@sebgroup/react-components/RadioButton";
import { CodeSnippet } from "@common/CodeSnippet";
import { Indicator, IndicatorType } from "@sebgroup/react-components/FeedbackIndicator";
import { Checkbox } from "@sebgroup/react-components/Checkbox";

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
    { key: "error", label: "danger", value: "danger" },
    { key: "success", label: "success", value: "success" },
    { key: "warning", label: "warning", value: "warning" },
];

const indicatorGrouping: Array<DynamicFormOption> = [
    { key: "individual", label: "Individual", value: "1", description: "Pass an indicator to individual radio buttons" },
    { key: "grouped", label: "Grouped", value: "2", description: "Pass an indicator to a RadioGroup or wrap a group of radio buttons with a FeedbackIndicator" },
];

const RadioButtonPage: React.FC = () => {
    const [value, setValue] = React.useState<React.ReactText>("Yes");

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "inline", label: "inline", controlType: "Checkbox", value: false, description: "Displays them inline" },
                { key: "disabled", label: "disabled", controlType: "Checkbox", value: false },
                { key: "indicator", label: "indicator", controlType: "Checkbox", value: false },
                {
                    key: "indicatorGrouping",
                    label: "Indicator choices",
                    controlType: "Radio",
                    rulerKey: "indicator",
                    condition: true,
                    options: indicatorGrouping,
                    value: indicatorGrouping[0],
                },
                { key: "indicatorType", label: "Indicator type", controlType: "Radio", rulerKey: "indicator", condition: true, options: indicators, value: indicators[0], inline: true },
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
                    <RadioGroup name="test-group" value={value} onChange={(e) => setValue(e.target.value)} {...controls} indicator={isGrouped ? indicator : null}>
                        <RadioButton value="Yes" indicator={isIndividual ? indicator : null}>
                            Yes
                            <p className="text-muted m-0">Express yourself here</p>
                        </RadioButton>
                        <RadioButton value="No">No</RadioButton>
                        <RadioButton value="Maybe">Maybe</RadioButton>
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
                        like <code>inline</code> or <code>disabled</code>
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
