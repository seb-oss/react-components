import React from "react";
import Docs from "@common/Docs";
import { TextLabel } from "@sebgroup/react-components/TextLabel";
import { DynamicFormSection, useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";

const TextLabelPage: React.FC = React.memo(() => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/TextLabel/TextLabel");
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                {
                    label: "Optional configurations",
                    key: "checkboxes",
                    controlType: "Option",
                    options: [{ label: "Custom html label and value", value: "customLabelAndValue", key: "customLabelAndValue" }],
                },
            ],
        },
    ];
    const {
        renderForm,
        state: { controls },
    } = useDynamicForm(fields);
    const code: string = `<TextLabel value="Some text value" label="Some text label" />`;

    /** check if key selected */
    const checkSelectedKey = (key: string) => {
        return (controls.checkboxes as string[])?.find((item: string) => item === key);
    };

    return (
        <Docs
            mainFile={importString}
            example={
                <TextLabel
                    value={
                        checkSelectedKey("customLabelAndValue") ? (
                            <>
                                400,000 kr <span className="pl-1 text-primary">More description</span>
                            </>
                        ) : (
                            "Some text value"
                        )
                    }
                    label="Current savings"
                />
            }
            code={code}
            controls={renderForm()}
        />
    );
});

export default TextLabelPage;
