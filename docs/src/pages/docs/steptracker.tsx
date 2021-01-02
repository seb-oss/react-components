import React from "react";
import Docs from "@common/Docs";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "@hooks/useDynamicForm";
import { StepTracker } from "@sebgroup/react-components/StepTracker";
import StepLabel, { StepLabelProps } from "@sebgroup/react-components/StepTracker/StepLabel";

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
    const fields: Array<DynamicFormSection> = React.useMemo(
        () => [
            {
                key: "controls",
                items: [
                    {
                        key: "orientation",
                        value: orientationList[0].value,
                        label: "Orientation",
                        options: orientationList,
                        controlType: "Dropdown",
                    },
                    {
                        key: "direction",
                        value: directionlist[0].value,
                        label: "Direction",
                        options: directionlist,
                        controlType: "Dropdown",
                    },
                    {
                        key: "step",
                        value: value,
                        min: 0,
                        max: 3,
                        label: "Step",
                        controlType: "Stepper",
                    },
                    {
                        label: "Optional configurations",
                        key: "checkboxes",
                        controlType: "Option",
                        options: [{ label: "Use numbers", value: "useNumbers", key: "useNumbers" }],
                    },
                ],
            },
        ],
        [value]
    );
    const [renderForm, form, setForm] = useDynamicForm(fields);
    const code: string = `<StepTracker list={[{ label: "hello" }]} step={0} onClick={null} />`;

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return form.controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };

    React.useEffect(() => {
        setValue((form.controls as any)?.step);
    }, [(form.controls as any)?.step]);

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

    return (
        <Docs
            mainFile={importString}
            example={
                <StepTracker
                    step={value}
                    onClick={setValue}
                    orientation={(form.controls as any)?.orientation}
                    labelPosition={(form.controls as any)?.direction}
                    useNumbers={checkSelectedKey("useNumbers")}
                >
                    {stepList.map((item, i) => (
                        <StepLabel label={item.label} key={i} />
                    ))}
                </StepTracker>
            }
            code={code}
            controls={renderForm()}
        />
    );
});

export default StepTrackerPage;
