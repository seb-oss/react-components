import React, { useEffect } from "react";
import Docs from "@common/Docs";
import { DynamicFormOption, useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
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
    { key: "error", label: "danger", value: "danger", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "success", label: "success", value: "success", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "warning", label: "warning", value: "warning", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
];

const StepTrackerPage: React.FC = React.memo(() => {
    const [value, setValue] = React.useState<number>(0);

    const {
        renderForm,
        state: { controls },
        setHidden,
    } = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "min", initialValue: 0, min: 0, max: 100, label: "Min", controlType: "Stepper" },
                { key: "max", initialValue: 10, min: 0, max: 100, label: "Max", controlType: "Stepper" },
                { key: "disabled", label: "disabled", controlType: "Checkbox" },
                { key: "indicator", label: "indicator", controlType: "Checkbox" },
                {
                    key: "indicatorType",
                    label: "Indicator type",
                    options: indicators,
                    controlType: "Radio",
                    initialValue: indicators[0].value,
                    formElementAdditionalProps: { className: "indent pl-3 pt-2" },
                },
            ],
        },
    ]);

    useEffect(() => {
        setHidden("controls", "indicatorType", !controls.indicator);
    }, [controls.indicator]);

    const indicator: Indicator = React.useMemo(() => {
        return controls.indicator ? ({ type: controls.indicatorType, message: "Indicator message" } as Indicator) : null;
    }, [controls.indicator, controls.indicatorType]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100">
                    <Stepper
                        label="Element label"
                        min={Number(controls.min)}
                        max={Number(controls.max)}
                        onIncrease={(_, isMax: boolean) => setValue(isMax ? Number(controls.max) : value + 1)}
                        onDecrease={(_, isMin: boolean) => setValue(isMin ? Number(controls.min) : value - 1)}
                        disabled={!!controls.disabled}
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
