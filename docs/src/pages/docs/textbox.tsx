import React from "react";
import Docs from "@common/Docs";
import SearchIcon from "../../../static/icons/search.svg";
import { Textbox } from "@sebgroup/react-components/Textbox";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "@hooks/useDynamicForm";
import { Indicator, IndicatorType } from "@sebgroup/react-components/FeedbackIndicator";

const importString: string = require("!raw-loader!@sebgroup/react-components/Textbox/Textbox");
const code: string = `<Textbox value="Some text value" label="Some text label" />`;

const defaultPortOption: DynamicFormOption = { label: "None", value: "none", key: "none" };
const textOption: DynamicFormOption = { label: "Text", value: "text", key: "text" };
const iconOption: DynamicFormOption = { label: "Icon", value: "icon", key: "icon" };
const indicators: Array<DynamicFormOption<IndicatorType>> = [
    { key: "error", label: "danger", value: "danger" },
    { key: "success", label: "success", value: "success" },
    { key: "warning", label: "warning", value: "warning" },
];

const TextboxPage: React.FC = React.memo(() => {
    const [value, setValue] = React.useState<string>("");

    const [renderForm, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "leftport", value: defaultPortOption.value, label: "Left icon or text?", options: [defaultPortOption, iconOption, textOption], controlType: "Dropdown" },
                { key: "rightport", value: defaultPortOption.value, label: "Right icon or text?", options: [defaultPortOption, iconOption, textOption], controlType: "Dropdown" },
                { key: "disabled", label: "disabled", controlType: "Checkbox" },
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
                <div className="w-100">
                    <Textbox
                        value={value}
                        label="Element label"
                        placeholder="Type here"
                        leftSlot={controls.leftport === iconOption.value ? <SearchIcon /> : controls.leftport === textOption.value ? "Kr" : null}
                        rightSlot={controls.rightport === iconOption.value ? <SearchIcon /> : controls.rightport === textOption.value ? "Kr" : null}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={controls.disabled}
                        indicator={indicator}
                    />
                </div>
            }
            code={code}
            controls={renderForm()}
        />
    );
});

export default TextboxPage;
