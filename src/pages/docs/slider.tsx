import React from "react";
import Docs from "components/Docs";
import { Slider } from "@sebgroup/react-components/Slider";
import { useDynamicForm } from "hooks/useDynamicForm";

const SliderPage: React.FC = (): React.ReactElement<void> => {
    const [value, setValue] = React.useState<number>(1);

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "min",
                    label: "Min",
                    order: 30,
                    controlType: "Text",
                    value: 1,
                },
                {
                    key: "max",
                    label: "Max",
                    order: 10,
                    controlType: "Text",
                    value: 100,
                },
                {
                    key: "step",
                    label: "Step",
                    order: 20,
                    controlType: "Text",
                    value: 1,
                },
                {
                    key: "showTicks",
                    label: "Show ticks",
                    order: 40,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "alwaysShowTooltip",
                    label: "Always show tooltip",
                    order: 60,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "disabled",
                    label: "Disabled",
                    order: 70,
                    controlType: "Checkbox",
                    value: false,
                },
                {
                    key: "tooltipTheme",
                    label: "Tooltip theme",
                    order: 80,
                    options: [
                        { key: "danger", label: "Danger", value: "danger" },
                        { key: "inverted", label: "Inverted", value: "inverted" },
                        { key: "primary", label: "Primary", value: "primary" },
                        { key: "purple", label: "Purple", value: "purple" },
                        { key: "success", label: "Success", value: "success" },
                        { key: "warning", label: "Warning", value: "warning" },
                    ],
                    controlType: "Radio",
                },
                {
                    key: "theme",
                    label: "Theme",
                    order: 90,
                    options: [
                        { key: "danger", label: "Danger", value: "danger" },
                        { key: "inverted", label: "Inverted", value: "inverted" },
                        { key: "primary", label: "Primary", value: "primary" },
                        { key: "purple", label: "Purple", value: "purple" },
                        { key: "success", label: "Success", value: "success" },
                        { key: "warning", label: "Warning", value: "warning" },
                    ],
                    controlType: "Radio",
                },
                {
                    key: "alternative",
                    label: "Appearance",
                    order: 100,
                    options: [
                        { key: "normal", label: "Normal(new default)", value: "normal" },
                        { key: "normal", label: "Alternative(old default)", value: "alternative" },
                    ],
                    controlType: "Radio",
                },
            ],
        },
    ]);

    const importString: string = React.useMemo(() => require("!raw-loader!@sebgroup/react-components/Slider/Slider"), []);
    const importedFiles: Array<string> = React.useMemo(() => [require("!raw-loader!@sebgroup/react-components/Slider/Slider")], []);
    const code: string = React.useMemo(() => require("!raw-loader!./slider").default, []);

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
                    />
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default SliderPage;
