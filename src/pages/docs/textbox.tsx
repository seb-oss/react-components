import React from "react";
import Docs from "components/Docs";
import SearchIcon from "../../../static/icons/search.svg";
import { TextBox } from "@sebgroup/react-components/TextBox";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";

const TextBoxPage: React.FC = React.memo(() => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/TextBox/TextBox");
    const defaultPortOption: DynamicFormOption = { label: "None", value: "none", key: "none" };
    const textOption: DynamicFormOption = { label: "Text", value: "text", key: "text" };
    const iconOption: DynamicFormOption = { label: "Icon", value: "icon", key: "icon" };
    const fields: Array<DynamicFormSection> = [
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
                    key: "placeholder",
                    value: "Placeholder",
                    label: "Placeholder",
                    placeholder: "Placeholder",
                    controlType: "Text",
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
                    key: "leftport",
                    value: defaultPortOption,
                    label: "Left icon or text?",
                    options: [defaultPortOption, iconOption, textOption],
                    controlType: "Dropdown",
                },
                {
                    key: "rightport",
                    value: defaultPortOption,
                    label: "Right icon or text?",
                    options: [defaultPortOption, iconOption, textOption],
                    controlType: "Dropdown",
                },
                {
                    key: "min",
                    value: 1,
                    min: 1,
                    max: 100,
                    label: "Min length",
                    controlType: "Stepper",
                },
                {
                    key: "max",
                    value: 100,
                    min: 1,
                    max: 100,
                    label: "Max length",
                    controlType: "Stepper",
                },
                {
                    label: "Optional configurations",
                    key: "checkboxes",
                    controlType: "Option",
                    options: [
                        { label: "Disabled", value: "disabled", key: "disabled" },
                        { label: "Readonly", value: "readonly", key: "readonly" },
                        { label: "Success", value: "success", key: "success" },
                        { label: "Show error message", value: "showErrorMessage", key: "showErrorMessage" },
                    ],
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const [value, setValue] = React.useState<string>("");
    const code: string = `<TextBox value="Some text value" label="Some text label" />`;

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };

    return (
        <Docs
            mainFile={importString}
            example={
                <TextBox
                    name="test"
                    value={value}
                    label={(controls as any)?.label}
                    placeholder={(controls as any)?.placeholder}
                    hint={(controls as any)?.hint}
                    hintTheme={(controls as any)?.hintTheme?.value}
                    leftSlot={(controls as any)?.leftport?.value === iconOption.value ? <SearchIcon /> : (controls as any)?.leftport?.value === textOption.value ? "Kr" : null}
                    rightSlot={(controls as any)?.rightport?.value === iconOption.value ? <SearchIcon /> : (controls as any)?.rightport?.value === textOption.value ? "Kr" : null}
                    minLength={(controls as any)?.min}
                    maxLength={(controls as any)?.max}
                    onChange={(element: React.ChangeEvent<HTMLInputElement>) => setValue(element.target.value)}
                    disabled={checkSelectedKey("disabled")}
                    readOnly={checkSelectedKey("readonly")}
                />
            }
            code={code}
            controls={renderForm()}
        />
    );
});

export default TextBoxPage;
