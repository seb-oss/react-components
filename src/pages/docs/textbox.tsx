import React from "react";
import Docs from "components/Docs";
import { TextBox } from "@sebgroup/react-components/TextBox";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";

const TextBoxPage: React.FC = React.memo(() => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/TextBox/TextBox");
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
