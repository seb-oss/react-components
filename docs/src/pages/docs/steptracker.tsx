import React from "react";
import Docs from "@common/Docs";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { StepTracker, StepTrackerProps } from "@sebgroup/react-components/StepTracker";

const importString: string = require("!raw-loader!@sebgroup/react-components/StepTracker/StepTracker");
const code: string = `<StepTracker list={[{ label: "hello" }]} step={0} onClick={null} />`;

const orientations: Array<DynamicFormOption<StepTrackerProps["orientation"]>> = [
    { label: "horizontal", value: "horizontal", key: "horizontal" },
    { label: "vertical", value: "vertical", key: "vertical" },
];
const verticalLabelPositions: Array<DynamicFormOption<StepTrackerProps["labelPosition"]>> = [
    { label: "right", value: "right", key: "right" },
    { label: "left", value: "left", key: "left" },
];
const horizontalLabelPositions: Array<DynamicFormOption<StepTrackerProps["labelPosition"]>> = [
    { label: "bottom", value: "bottom", key: "bottom" },
    { label: "top", value: "top", key: "top" },
];

const StepTrackerPage: React.FC = React.memo(() => {
    const [value, setValue] = React.useState<number>(0);

    const [renderForm, form, setForm] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "orientation", value: orientations[0].value, label: "Orientation", options: orientations, controlType: "Dropdown" },
                {
                    key: "hdirection",
                    condition: "horizontal",
                    rulerKey: "orientation",
                    value: horizontalLabelPositions[0].value,
                    label: "Direction",
                    options: horizontalLabelPositions,
                    controlType: "Dropdown",
                },
                {
                    key: "vdirection",
                    condition: "vertical",
                    rulerKey: "orientation",
                    value: verticalLabelPositions[0].value,
                    label: "Direction",
                    options: verticalLabelPositions,
                    controlType: "Dropdown",
                },
                { key: "step", value: value, min: 0, max: 3, label: "Step", controlType: "Stepper" },
                { label: "Optional configurations", key: "checkboxes", controlType: "Option", options: [{ label: "Use numbers", value: "useNumbers", key: "useNumbers" }] },
            ],
        },
    ]);

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return form.controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };

    React.useEffect(() => setValue((form.controls as any)?.step), [(form.controls as any)?.step]);

    React.useEffect(() => {
        if (value !== form.controls.step) {
            setForm({
                ...form,
                controls: {
                    ...form.controls,
                    step: value,
                },
            });
        }
    }, [value]);

    const labelPosition = form.controls.orientation === "horizontal" ? form.controls.hdirection : form.controls.vdirection;
    console.log("🚀 ~ file: steptracker.tsx ~ line 74 ~ constStepTrackerPage:React.FC=React.memo ~ labelPosition", labelPosition);

    return (
        <Docs
            mainFile={importString}
            example={
                <StepTracker value={value} onStepClicked={setValue} orientation={form.controls.orientation} labelPosition={labelPosition} useNumbers={checkSelectedKey("useNumbers")}>
                    <StepTracker.Label>First</StepTracker.Label>
                    <StepTracker.Label>Second</StepTracker.Label>
                    <StepTracker.Label>Third</StepTracker.Label>
                    <StepTracker.Label>Fourth</StepTracker.Label>
                </StepTracker>
            }
            code={code}
            controls={renderForm()}
        />
    );
});

export default StepTrackerPage;
