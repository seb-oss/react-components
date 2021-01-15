import React from "react";
import Docs from "@common/Docs";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { StepTracker, Step } from "@sebgroup/react-components/StepTracker";
import { Stepper } from "@sebgroup/react-components/Stepper";

const importString: string = require("!raw-loader!@sebgroup/react-components/StepTracker/StepTracker");
const code: string = `<StepTracker value={value} onStepChange={setValue}>
    <Step>First</Step>
    <Step>Second</Step>
    <Step>Third</Step>
</StepTracker>`;

const orientations: Array<DynamicFormOption> = [
    { label: "vertical", value: "vertical", key: "vertical" },
    { label: "horizontal", value: "horizontal", key: "horizontal" },
];
const horizontalDirections: Array<DynamicFormOption> = [
    { label: "bottom", value: "bottom", key: "bottom" },
    { label: "top", value: "top", key: "top" },
];
const verticalDirections: Array<DynamicFormOption> = [
    { label: "right", value: "right", key: "right" },
    { label: "left", value: "left", key: "left" },
];

const StepTrackerPage: React.FC = React.memo(() => {
    const [value, setValue] = React.useState<number>(0);

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "orientation", value: orientations[0].value, label: "Orientation", options: orientations, controlType: "Dropdown" },
                {
                    key: "horizontalDirection",
                    label: "Direction",
                    options: horizontalDirections,
                    value: horizontalDirections[0].value,
                    controlType: "Dropdown",
                    rulerKey: "orientation",
                    condition: "horizontal",
                },
                {
                    key: "verticalDirection",
                    label: "Direction",
                    options: verticalDirections,
                    value: verticalDirections[0].value,
                    controlType: "Dropdown",
                    rulerKey: "orientation",
                    condition: "vertical",
                },
                { key: "useNumbers", label: "Use numbers", controlType: "Checkbox" },
            ],
        },
    ]);

    const labelPosition = controls.orientation === "vertical" ? controls.verticalDirection : controls.horizontalDirection;

    return (
        <Docs
            mainFile={importString}
            example={
                <StepTracker value={value} onChange={setValue} orientation={controls.orientation} labelPosition={labelPosition} useNumbers={controls.useNumbers}>
                    <Step>First</Step>
                    <Step>Second</Step>
                    <Step>Third</Step>
                    <Step>Fourth</Step>
                </StepTracker>
            }
            code={code}
            controls={
                <>
                    <Stepper label="Value" value={value} onChange={setValue} min={0} max={3} />
                    <br />
                    {renderControls()}
                </>
            }
        />
    );
});

export default StepTrackerPage;
