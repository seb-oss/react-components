import React from "react";
import Docs from "@common/Docs";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { Stepper } from "@sebgroup/react-components/Stepper";
import { Indicator, IndicatorType } from "@sebgroup/react-components/FeedbackIndicator";

const importString: string = require("!raw-loader!@sebgroup/react-components/Stepper/Stepper");
const code: string = `<Stepper
    label={"stepper label"}
    min={0}
    max={100}
    onIncrease={null}
    onDecrease={null}
    value={0}
/>`;

const indicators: Array<DynamicFormOption<IndicatorType>> = [
    { key: "error", label: "danger", value: "danger" },
    { key: "success", label: "success", value: "success" },
    { key: "warning", label: "warning", value: "warning" },
];

const StepTrackerPage: React.FC = React.memo(() => {
    const [value, setValue] = React.useState<number>(0);

    const [renderForm, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "min", value: 0, min: 0, max: 100, label: "Min", controlType: "Stepper" },
                { key: "max", value: 10, min: 0, max: 100, label: "Max", controlType: "Stepper" },
                { key: "disabled", label: "disabled", controlType: "Checkbox" },
                { key: "indicator", label: "indicator", controlType: "Checkbox" },
                { key: "indicatorType", rulerKey: "indicator", condition: true, label: "Indicator type", options: indicators, inline: true, controlType: "Radio", value: indicators[0], indent: true },
            ],
        },
    ]);

    const indicator: Indicator = controls.indicator ? { type: controls.indicatorType?.value, message: "Indicator message" } : null;

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100">
                    <Stepper
                        label="Element label"
                        min={controls.min}
                        max={controls.max}
                        onIncrease={() => setValue(value + 1)}
                        onDecrease={() => setValue(value - 1)}
                        disabled={controls.disabled}
                        value={value}
                        indicator={indicator}
                    />
                </div>
            }
            code={code}
            controls={renderForm()}
        />
    );
});

export default StepTrackerPage;
