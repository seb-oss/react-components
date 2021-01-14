import React from "react";
import Docs from "@common/Docs";
import { Textarea } from "@sebgroup/react-components/Textarea";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { Indicator, IndicatorType } from "@sebgroup/react-components/FeedbackIndicator";

const importString: string = require("!raw-loader!@sebgroup/react-components/Textarea/Textarea");
const code: string = `<Textarea value="Some text value" label="Some text label" />`;

const indicators: Array<DynamicFormOption<IndicatorType>> = [
    { key: "error", label: "danger", value: "danger" },
    { key: "success", label: "success", value: "success" },
    { key: "warning", label: "warning", value: "warning" },
];

const TextareaPage: React.FC = React.memo(() => {
    const [value, setValue] = React.useState<string>("");

    const [renderForm, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "disabled", label: "disabled", controlType: "Checkbox" },
                { key: "resizable", label: "resizable", controlType: "Checkbox", value: true },
                { key: "indicator", label: "indicator", controlType: "Checkbox" },
                { key: "indicatorType", rulerKey: "indicator", condition: true, label: "Indicator type", options: indicators, inline: true, controlType: "Radio", value: indicators[0], indent: true },
            ],
        },
    ]);

    const indicator: Indicator = controls.indicator ? { type: controls.indicatorType?.value, message: "Indicator message" } : null;

    return (
        <Docs
            mainFile={importString}
            example={
                <Textarea
                    name="test"
                    value={value}
                    label="Element label"
                    placeholder="Placeholder..."
                    onChange={(e) => setValue(e.target.value)}
                    disabled={controls.disabled}
                    readOnly={controls.readonly}
                    resizable={controls.resizable}
                    indicator={indicator}
                />
            }
            code={code}
            controls={renderForm()}
        />
    );
});

export default TextareaPage;
