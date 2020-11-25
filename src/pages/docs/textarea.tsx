import React from "react";
import Docs from "components/Docs";
import { TextArea } from "@sebgroup/react-components/TextArea";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";

const TextAreaPage: React.FC = React.memo(() => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/TextArea/TextArea");
    const checkboxControls: Array<DynamicFormOption> = [
        { label: "Disabled", value: "disabled", key: "disabled" },
        { label: "Readonly", value: "readonly", key: "readonly" },
        { label: "Rresizable", value: "resizable", key: "resizable" },
    ];
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
                    key: "columns",
                    value: 22,
                    min: 1,
                    max: 100,
                    label: "Columns",
                    controlType: "Stepper",
                },
                {
                    key: "rows",
                    value: 6,
                    min: 1,
                    max: 100,
                    label: "Rows",
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
                    value: [checkboxControls[checkboxControls.length - 1]],
                    options: checkboxControls,
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const [value, setValue] = React.useState<string>("");
    const code: string = `<TextArea value="Some text value" label="Some text label" />`;

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);
    };

    return (
        <Docs
            mainFile={importString}
            example={
                <TextArea
                    name="test"
                    value={value}
                    label={(controls as any)?.label}
                    placeholder={(controls as any)?.placeholder}
                    cols={(controls as any)?.columns}
                    rows={(controls as any)?.rows}
                    maxLength={(controls as any)?.max}
                    onChange={(element: React.ChangeEvent<HTMLTextAreaElement>) => setValue(element.target.value)}
                    disabled={checkSelectedKey("disabled")}
                    readOnly={checkSelectedKey("readonly")}
                    resizable={checkSelectedKey("resizable")}
                />
            }
            code={code}
            controls={renderForm()}
        />
    );
});

export default TextAreaPage;
