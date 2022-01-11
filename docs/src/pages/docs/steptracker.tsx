import React from "react";
import Docs from "@common/Docs";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import { StepTracker, StepLabel, StepLabelProps } from "@sebgroup/react-components/StepTracker";

const StepTrackerPage: React.FC = React.memo(() => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/StepTracker/StepTracker");
    const stepList: Array<StepLabelProps> = [{ label: "First" }, { label: "Second" }, { label: "Third" }, { label: "Forth" }];
    const orientationList: Array<DynamicFormOption> = [
        { label: "vertical", value: "vertical", key: "vertical" },
        { label: "horizontal", value: "horizontal", key: "horizontal" },
    ];
    const directionlist: Array<DynamicFormOption> = [
        { label: "bottom", value: "bottom", key: "bottom" },
        { label: "top", value: "top", key: "top" },
        { label: "right", value: "right", key: "right" },
        { label: "left", value: "left", key: "left" },
    ];
    const [value, setValue] = React.useState<number>(0);
    const {
        renderForm,
        state: { controls },
    } = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "orientation",
                    initialValue: orientationList[0].value,
                    label: "Orientation",
                    options: orientationList,
                    controlType: "Dropdown",
                },
                {
                    key: "labelPosition",
                    initialValue: directionlist[0].value,
                    label: "Direction",
                    options: directionlist,
                    controlType: "Dropdown",
                },
                {
                    label: "Use numbers",
                    key: "useNumbers",
                    initialValue: false,
                    controlType: "Checkbox",
                },
            ],
        },
    ]);
    const code: string = `<StepTracker list={[{ label: "hello" }]} step={0} onClick={null} />`;

    const { orientation, labelPosition, useNumbers } = controls as { [k: string]: any };

    return (
        <Docs
            mainFile={importString}
            example={
                <>
                    <div
                        className="sr-only"
                        id="step-tracker-progress"
                        role="progressbar"
                        aria-label={`Step ${value + 1} out of ${stepList.length}: ${stepList[value].label}`}
                        aria-valuenow={value}
                        aria-valuemin={1}
                        aria-valuemax={stepList.length + 1}
                        aria-live="polite"
                    />
                    <StepTracker aria-describedby="step-tracker-progress" step={value} onClick={setValue} {...{ orientation, labelPosition, useNumbers }}>
                        {stepList.map((item, i) => (
                            <StepLabel label={item.label} key={i} />
                        ))}
                    </StepTracker>
                </>
            }
            code={code}
            controls={renderForm()}
        />
    );
});

export default StepTrackerPage;
