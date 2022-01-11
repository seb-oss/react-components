import React, { useEffect } from "react";
import Docs from "@common/Docs";
import SearchIcon from "../../../static/icons/search.svg";
import { Textbox } from "@sebgroup/react-components/Textbox";
import { DynamicFormOption, useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import { Indicator, IndicatorType } from "@sebgroup/react-components/FeedbackIndicator";

const importString: string = require("!raw-loader!@sebgroup/react-components/Textbox/Textbox");
const code: string = `<Textbox value="Some text value" label="Some text label" />`;

const defaultPortOption: DynamicFormOption = { label: "None", value: "none", key: "none" };
const textOption: DynamicFormOption = { label: "Text", value: "text", key: "text" };
const iconOption: DynamicFormOption = { label: "Icon", value: "icon", key: "icon" };
const indicators: Array<DynamicFormOption<IndicatorType>> = [
    { key: "error", label: "danger", value: "danger", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "success", label: "success", value: "success", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
    { key: "warning", label: "warning", value: "warning", additionalProps: { wrapperProps: { className: "d-inline-block" } } },
];

const TextboxPage: React.FC = React.memo(() => {
    const [value, setValue] = React.useState<string>("");

    const {
        renderForm,
        state: { controls },
        setHidden,
    } = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "leftport", initialValue: defaultPortOption.value, label: "Left icon or text?", options: [defaultPortOption, iconOption, textOption], controlType: "Dropdown" },
                { key: "rightport", initialValue: defaultPortOption.value, label: "Right icon or text?", options: [defaultPortOption, iconOption, textOption], controlType: "Dropdown" },
                { key: "disabled", label: "disabled", controlType: "Checkbox" },
                { key: "indicator", label: "indicator", controlType: "Checkbox" },
                {
                    key: "indicatorType",
                    label: "Indicator type",
                    options: indicators,
                    controlType: "Radio",
                    initialValue: indicators[0].value,
                    formElementAdditionalProps: { className: "indent pl-3 pt-2" },
                },
            ],
        },
    ]);

    useEffect(() => {
        setHidden("controls", "indicatorType", !controls.indicator);
    }, [controls.indicator]);

    const indicator: Indicator = React.useMemo(() => {
        return controls.indicator ? { type: controls.indicatorType as IndicatorType, message: "Indicator message" } : null;
    }, [controls.indicator, controls.indicatorType]);

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
                        disabled={!!controls.disabled}
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
