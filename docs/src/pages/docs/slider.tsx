import React, { useEffect } from "react";
import Docs from "@common/Docs";
import { SliderLabel, Slider, SliderTheme } from "@sebgroup/react-components/Slider";
import { DynamicFormOption, useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
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
    { key: "error", label: "danger", value: "danger", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "success", label: "success", value: "success", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "warning", label: "warning", value: "warning", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
];

const SliderPage: React.FC = (): React.ReactElement<void> => {
    const [value, setValue] = React.useState<number>(1);

    const {
        renderForm: renderControls,
        state: { controls },
        setHidden,
    } = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "theme", label: "Theme", options: tooltipThemes, initialValue: "primary", controlType: "Dropdown", additionalProps: { className: "indent pl-3 pt-2" } },
                { key: "tooltipTheme", label: "Tooltip theme", options: tooltipThemes, initialValue: "inverted", controlType: "Dropdown", additionalProps: { className: "indent pl-3 pt-2" } },
                { key: "min", label: "Min", controlType: "Text", initialValue: 1, formElementAdditionalProps: { type: "number" } },
                { key: "max", label: "Max", controlType: "Text", initialValue: 100, formElementAdditionalProps: { type: "number" } },
                { key: "step", label: "Step", controlType: "Text", initialValue: 1, formElementAdditionalProps: { type: "number" } },
                { key: "alternative", label: "alternative", controlType: "Checkbox", initialValue: false, description: "Render with an alternative style" },
                { key: "alwaysShowTooltip", label: "alwaysShowTooltip", controlType: "Checkbox", initialValue: false },
                { key: "disabled", label: "disabled", controlType: "Checkbox", initialValue: false },
                { key: "indicator", label: "indicator", controlType: "Checkbox", initialValue: false },
                {
                    key: "indicatorType",
                    label: "Indicator type",
                    controlType: "Radio",
                    options: indicators,
                    initialValue: indicators[0].value,
                    formElementAdditionalProps: { className: "indent pl-3 pt-2" },
                },
                { key: "labels", label: "labels", controlType: "Checkbox", initialValue: false, description: "Pass a list of positions and labels to be mapped" },
                {
                    key: "showTicks",
                    label: "showTicks",
                    controlType: "Checkbox",
                    initialValue: false,
                    description: "Show ticks for the lables",
                    formElementAdditionalProps: { className: "indent pl-3 pt-2" },
                },
            ],
        },
    ]);

    const center: number = Math.floor(((controls.max as number) - (controls.min as number)) / 2) + (controls.min as number);

    const labels: SliderLabel[] = [
        { position: controls.min as number, label: controls.min },
        { position: 2, label: 2 },
        { position: center, label: center },
        { position: controls.max as number, label: controls.max },
    ];

    useEffect(() => {
        setHidden("controls", "indicatorType", !controls.indicator);
    }, [controls.indicator]);

    useEffect(() => {
        setHidden("controls", "showTicks", !controls.labels);
    }, [controls.labels]);

    const indicator: Indicator = React.useMemo(() => {
        return controls.indicator ? { type: controls.indicatorType as IndicatorType, message: "Indicator message" } : null;
    }, [controls.indicator, controls.indicatorType]);

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
