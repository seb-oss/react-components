import React from "react";
import Docs from "components/Docs";
import { RadioButton } from "@sebgroup/react-components/RadioButton";
import { DynamicFormOption, useDynamicForm } from "hooks/useDynamicForm";

const RadioButtonPage: React.FC = (): React.ReactElement<void> => {
    const [selectedRadio, setSelectedRadio] = React.useState<number>();

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "topLabel",
                    label: "Top label",
                    order: 10,
                    controlType: "Text",
                    value: "",
                },
                {
                    key: "label",
                    label: "Label",
                    order: 0,
                    controlType: "Text",
                    value: "Label",
                },
                {
                    key: "description",
                    label: "Description",
                    order: 50,
                    controlType: "Text",
                    value: "",
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

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/RadioButton/RadioButton"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/RadioButton/RadioButton")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./radiobutton").default, []);
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
                    {[1, 2, 3].map((number: number) => (
                        <RadioButton
                            value={number}
                            name="test"
                            {...controls}
                            key={`radio-${number}`}
                            checked={number === selectedRadio}
                            onChange={(value: number) => setSelectedRadio(value)}
                            inline={checkSelectedKey("inline")}
                            condensed={checkSelectedKey("condensed")}
                            disabled={checkSelectedKey("disabled")}
                        />
                    ))}
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default RadioButtonPage;
