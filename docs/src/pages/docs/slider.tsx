import React from "react";
import Docs from "@common/Docs";
import { SliderLabel, Slider, SliderTheme } from "@sebgroup/react-components/Slider";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { Indicator, IndicatorType } from "@sebgroup/react-components/FeedbackIndicator";

const importString: string = require("!raw-loader!@sebgroup/react-components/Slider/Slider");
const code: string = `<Slider value={value} onChange={e => setValue(parseInt(e.target.value))} />`;

const tooltipThemes: Array<DynamicFormOption<SliderTheme>> = [
    { key: "inverted", label: "Inverted", value: "inverted" },
    { key: "danger", label: "Danger", value: "danger" },
    { key: "primary", label: "Primary", value: "primary" },
    { key: "purple", label: "Purple", value: "purple" },
    { key: "success", label: "Success", value: "success" },
    { key: "warning", label: "Warning", value: "warning" },
];
const indicators: Array<DynamicFormOption<IndicatorType>> = [
    { key: "error", label: "danger", value: "danger" },
    { key: "success", label: "success", value: "success" },
    { key: "warning", label: "warning", value: "warning" },
];

const SliderPage: React.FC = (): React.ReactElement<void> => {
    const [value, setValue] = React.useState<number>(1);

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "theme", label: "Theme", options: tooltipThemes, value: "primary", controlType: "Dropdown", inline: true },
                { key: "tooltipTheme", label: "Tooltip theme", options: tooltipThemes, value: "inverted", controlType: "Dropdown", inline: true },
                { key: "min", label: "Min", controlType: "Text", value: 1, valueType: "number" },
                { key: "max", label: "Max", controlType: "Text", value: 100, valueType: "number" },
                { key: "step", label: "Step", controlType: "Text", value: 1, valueType: "number" },
                { key: "alternative", label: "alternative", controlType: "Checkbox", value: false, description: "Render with an alternative style" },
                { key: "alwaysShowTooltip", label: "alwaysShowTooltip", controlType: "Checkbox", value: false },
                { key: "disabled", label: "disabled", controlType: "Checkbox", value: false },
                { key: "indicator", label: "indicator", controlType: "Checkbox", value: false },
                { key: "indicatorType", label: "Indicator type", controlType: "Radio", rulerKey: "indicator", condition: true, options: indicators, value: indicators[0], inline: true, indent: true },
                { key: "labels", label: "labels", controlType: "Checkbox", value: false, description: "Pass a list of positions and labels to be mapped" },
                { key: "showTicks", label: "showTicks", controlType: "Checkbox", value: false, description: "Show ticks for the lables", rulerKey: "labels", condition: true, indent: true },
            ],
        },
    ]);

    const center: number = Math.floor((controls.max - controls.min) / 2) + controls.min;

    const labels: SliderLabel[] = [
        { position: controls.min, label: controls.min },
        { position: center, label: center },
        { position: controls.max, label: controls.max },
    ];

    const indicator: Indicator = controls.indicator ? { type: controls.indicatorType?.value, message: "Indicator message" } : null;

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100">
                    <Slider {...controls} value={value} indicator={indicator} onChange={(e) => setValue(Number(e.target.value))} labels={controls.labels ? labels : null} />
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

export default SliderPage;
