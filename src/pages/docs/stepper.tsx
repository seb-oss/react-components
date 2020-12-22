import React from "react";
import Docs from "components/Docs";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";
import { Stepper } from "@sebgroup/react-components/Stepper";

const StepTrackerPage: React.FC = React.memo(() => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Stepper/Stepper");
    const fields: Array<DynamicFormSection> = React.useMemo(
        () => [
            {
                key: "controls",
                items: [
                    {
                        key: "label",
                        value: "Element label",
                        label: "Label",
                        placeholder: "Label",
                        controlType: "Text",
                    },
                    {
                        key: "min",
                        value: 0,
                        min: 0,
                        max: 100,
                        label: "Min",
                        controlType: "Stepper",
                    },
                    {
                        key: "max",
                        value: 10,
                        min: 0,
                        max: 100,
                        label: "Max",
                        controlType: "Stepper",
                    },
                    {
                        key: "hint",
                        value: "",
                        label: "Hint",
                        placeholder: "Hint",
                        controlType: "Text",
                    },
                    {
                        key: "hintTheme",
                        label: "Hint theme",
                        placeholder: "Hint theme",
                        options: [
                            { label: "Default", value: null, key: "default" },
                            { label: "Success", value: "success", key: "success" },
                            { label: "Danger", value: "danger", key: "danger" },
                            { label: "Warning", value: "warning", key: "warning" },
                        ],
                        controlType: "Dropdown",
                    },
                    {
                        label: "Optional configurations",
                        key: "checkboxes",
                        controlType: "Option",
                        options: [{ label: "Disabled", value: "disabled", key: "disabled" }],
                    },
                ],
            },
        ],
        []
    );
    const [renderForm, { controls }] = useDynamicForm(fields);
    const [value, setValue] = React.useState<number>(0);
    const code: string = `<Stepper
        label={"stepper label"}
        min={0}
        max={100}
        onIncrease={null}
        onDecrease={null}
        value={0}
    />`;

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };

    return (
        <Docs
            mainFile={importString}
            example={
                <Stepper
                    label={(controls as any)?.label}
                    min={(controls as any)?.min}
                    max={(controls as any)?.max}
                    onIncrease={() => setValue(value + 1)}
                    onDecrease={() => setValue(value - 1)}
                    disabled={checkSelectedKey("disabled")}
                    value={value}
                    hint={(controls as any)?.hint}
                    hintTheme={(controls as any)?.hintTheme}
                />
            }
            code={code}
            controls={renderForm()}
        />
    );
});

export default StepTrackerPage;
