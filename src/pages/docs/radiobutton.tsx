import React from "react";
import Docs from "components/Docs";
import { RadioButton } from "@sebgroup/react-components/RadioButton";
import { useDynamicForm } from "hooks/useDynamicForm";

const RadioButtonPage: React.FC = (): React.ReactElement<void> => {
    const [radioListSelected, setRadioListSelected] = React.useState<string>("");

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "inline",
                    label: "Inline",
                    order: 40,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "disabled",
                    label: "Disable",
                    order: 30,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "condensed",
                    label: "Condensed",
                    order: 20,
                    controlType: "Checkbox",
                    value: false,
                },
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
            ],
        },
    ]);

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/RadioButton/RadioButton"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/RadioButton/RadioButton")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./radiobutton").default, []);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100">
                    {[1, 2, 3].map((num: number) => (
                        <RadioButton value={radioListSelected} name="test" radioValue={`radio-${num}`} {...controls} key={`radio-${num}`} onChange={(value: string) => setRadioListSelected(value)} />
                    ))}
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default RadioButtonPage;
