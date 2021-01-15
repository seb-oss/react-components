import React from "react";
import Docs from "@common/Docs";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { Stepper } from "@sebgroup/react-components/Stepper";
import { Indicator, IndicatorType } from "@sebgroup/react-components/FeedbackIndicator";

const importString: string = require("!raw-loader!@sebgroup/react-components/Stepper/Stepper");
const code: string = `<Stepper value={value} onStepChange={setValue} />`;

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
            example={<Stepper label="Element label" value={value} onChange={setValue} disabled={controls.disabled} indicator={indicator} min={0} max={10} />}
            code={code}
            controls={renderForm()}
        />
    );
});

export default StepTrackerPage;
