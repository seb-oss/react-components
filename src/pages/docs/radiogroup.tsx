import React from "react";
import Docs from "components/Docs";
import { DynamicFormOption, useDynamicForm } from "hooks/useDynamicForm";
import { RadioButtonProps, RadioGroup } from "@sebgroup/react-components/RadioGroup";

const RadioButtonPage: React.FC = (): React.ReactElement<void> => {
    const list: RadioButtonProps[] = [
        { value: "1", label: "First", description: "with description" },
        { value: "2", label: "Second" },
        { value: "3", label: "Third (disabled)", disabled: true },
        {
            value: "4",
            label: (
                <>
                    <code>4️⃣ Fourth (using custom template)</code> 😊
                </>
            ),
        },
        { value: "5", label: "Fifth" },
    ];
    const [selectedRadio, setSelectedRadio] = React.useState<string>();

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "label",
                    label: "Label",
                    order: 0,
                    controlType: "Text",
                    value: "Label",
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
                    value: { label: "Default", value: null, key: "default" },
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
                    options: [
                        { label: "inline", value: "inline", key: "inline" },
                        { label: "condensed", value: "condensed", key: "condensed" },
                        { label: "disabled", value: "disabled", key: "disabled" },
                    ],
                },
            ],
        },
    ]);

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/RadioGroup/RadioGroup"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/RadioGroup/RadioGroup")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./radiogroup").default, []);
    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };
    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100">
                    <RadioGroup
                        {...controls}
                        list={list}
                        value={selectedRadio}
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setSelectedRadio(ev.target.value)}
                        inline={checkSelectedKey("inline")}
                        condensed={checkSelectedKey("condensed")}
                        disabled={checkSelectedKey("disabled")}
                        hint={(controls as any)?.hint}
                        hintTheme={(controls as any)?.hintTheme?.value}
                    />
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default RadioButtonPage;
