import React from "react";
import Docs from "components/Docs";
import { DynamicFormOption, useDynamicForm } from "hooks/useDynamicForm";
import { RadioButtonProps, RadioGroup, RadioButton } from "@sebgroup/react-components/RadioButton";

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
    const [radioList, setRadioList] = React.useState<RadioButtonProps[]>([...list]);

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "label",
                    label: "Label",
                    order: 0,
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
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/RadioButton/RadioGroup/RadioGroup")], []);
    const code: string = `<RadioButton label={label} value={selectedValue} onChange={e => setSelectedValue(e.target.value)} />`;

    const checkSelectedKey = (key: string) => controls.checkboxes?.some((item: DynamicFormOption) => item.key === key);

    React.useEffect(() => {
        setRadioList(
            [...list].map((item: RadioButtonProps) => ({
                ...item,
                label: controls.label || item.label,
            }))
        );
    }, [controls]);

    return (
        <Docs
            mainFile={importString}
            importedFiles={importedFiles}
            example={
                <div className="w-100">
                    {radioList?.map((item: RadioButtonProps, index: number) => (
                        <RadioButton
                            key={index}
                            {...item}
                            checked={selectedRadio === item.value}
                            inline={checkSelectedKey("inline")}
                            condensed={checkSelectedKey("condensed")}
                            disabled={checkSelectedKey("disabled")}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setSelectedRadio(ev.target.value)}
                        />
                    ))}
                    <RadioGroup
                        label="Render list using radio group"
                        list={radioList}
                        value={selectedRadio}
                        onChange={(e) => setSelectedRadio(e.target.value)}
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
