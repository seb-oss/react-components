import React from "react";
import Docs from "components/Docs";
import { Slider } from "@sebgroup/react-components/Slider";
import { DynamicFormOption, useDynamicForm } from "hooks/useDynamicForm";

const SliderPage: React.FC = (): React.ReactElement<void> => {
    const [value, setValue] = React.useState<number>(1);

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "min",
                    label: "Min",
                    controlType: "Text",
                    value: 1,
                },
                {
                    key: "max",
                    label: "Max",
                    controlType: "Text",
                    value: 100,
                },
                {
                    key: "step",
                    label: "Step",
                    controlType: "Text",
                    value: 1,
                },
                {
                    key: "tooltipTheme",
                    label: "Tooltip theme",
                    options: [
                        { key: "danger", label: "Danger", value: "danger" },
                        { key: "inverted", label: "Inverted", value: "inverted" },
                        { key: "primary", label: "Primary", value: "primary" },
                        { key: "purple", label: "Purple", value: "purple" },
                        { key: "success", label: "Success", value: "success" },
                        { key: "warning", label: "Warning", value: "warning" },
                    ],
                    value: { key: "primary", label: "Primary", value: "primary" },
                    controlType: "Dropdown",
                },
                {
                    key: "theme",
                    label: "Theme",
                    options: [
                        { key: "danger", label: "Danger", value: "danger" },
                        { key: "inverted", label: "Inverted", value: "inverted" },
                        { key: "primary", label: "Primary", value: "primary" },
                        { key: "purple", label: "Purple", value: "purple" },
                        { key: "success", label: "Success", value: "success" },
                        { key: "warning", label: "Warning", value: "warning" },
                    ],
                    value: { key: "primary", label: "Primary", value: "primary" },
                    controlType: "Dropdown",
                },
                {
                    key: "alternative",
                    label: "Appearance",
                    options: [
                        { key: "normal", label: "Normal(new default)", value: "normal" },
                        { key: "normal", label: "Alternative(old default)", value: "alternative" },
                    ],
                    value: { key: "normal", label: "Normal(new default)", value: "normal" },
                    controlType: "Dropdown",
                },
                {
                    label: "Optional configurations",
                    key: "checkboxes",
                    controlType: "Option",
                    options: [
                        { label: "Show ticks", value: "showTicks", key: "showTicks" },
                        { label: "Always show tooltip", value: "alwaysShowTooltip", key: "alwaysShowTooltip" },
                        { label: "disabled", value: "disabled", key: "disabled" },
                    ],
                },
            ],
        },
    ]);

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/Slider/Slider"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/Slider/Slider")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./slider").default, []);

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
                    <Slider
                        {...controls}
                        value={value}
                        theme={controls?.theme?.value}
                        tooltipTheme={controls?.tooltipTheme?.value}
                        alternative={controls?.alternative?.value === "alternative"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setValue(Number(e.target.value));
                        }}
                        showTicks={checkSelectedKey("showTicks")}
                        alwaysShowTooltip={checkSelectedKey("alwaysShowTooltip")}
                        disabled={checkSelectedKey("disabled")}
                    />
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default SliderPage;
