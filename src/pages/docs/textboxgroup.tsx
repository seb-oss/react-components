import React from "react";
import Docs from "components/Docs";
import SearchIcon from "../../../static/icons/search.svg";
import { TextBoxGroup } from "@sebgroup/react-components/TextBoxGroup";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";

const TextBoxGroupPage: React.FC = React.memo(() => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/TextBoxGroup/TextBoxGroup");
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
                    ],
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const [value, setValue] = React.useState<string>("");
    const code: string = `<TextBoxGroup value="Some text value" label="Some text label" />`;

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };

    return (
        <Docs
            mainFile={importString}
            example={
                <TextBoxGroup
                    name="test"
                    value={value}
                    label={(controls as any)?.label}
                    placeholder={(controls as any)?.placeholder}
                    leftText={(controls as any)?.leftport?.value === textOption.value ? "Kr" : null}
                    leftIcon={(controls as any)?.leftport?.value === iconOption.value ? <SearchIcon /> : null}
                    rightText={(controls as any)?.rightport?.value === textOption.value ? "Kr" : null}
                    rightIcon={(controls as any)?.rightport?.value === iconOption.value ? <SearchIcon /> : null}
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

export default TextBoxGroupPage;
