import Docs from "@common/Docs";
import { Datepicker } from "@sebgroup/react-components/Datepicker";
import { useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";
import React, { useEffect } from "react";

const importString: string = require("!raw-loader!@sebgroup/react-components/Datepicker/Datepicker");
const code = `<Datepicker value={dateValue} onChange={setDateValue} />`;

const DatepickerPage: React.FC = () => {
    const [exampleDate, setExampleDate] = React.useState<Date>(new Date());

    const {
        renderForm: renderControls,
        state: { controls },
        setHidden,
    } = useDynamicForm([
        {
            key: "controls",
            items: [
                {
                    key: "min",
                    label: "Min date:",
                    description: "Set the minimum date",
                    controlType: "Datepicker",
                },
                {
                    key: "max",
                    label: "Max date:",
                    description: "Set the maximum date",
                    controlType: "Datepicker",
                },
                { key: "monthPicker", label: "Month picker", description: "Switch to month picker only", controlType: "Checkbox" },
                { key: "forceCustom", label: "Custom date picker", description: "This picker is the automatic fallback on browsers that don't support html5 datepicker", controlType: "Checkbox" },
                {
                    key: "localeCode",
                    label: "Locale code:",
                    description: "Set a locale for the custom picker (defaults to system locale).",
                    controlType: "Text",
                    wrappingElement: "div",
                    additionalProps: { className: "indent pl-3 pt-2" },
                },
            ],
        },
    ]);

    useEffect(() => {
        setHidden("controls", "localeCode", !controls.forceCustom);
    }, [controls.forceCustom, setHidden]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100">
                    <label id="chooseDate">Choose a date:</label>
                    <Datepicker
                        value={exampleDate}
                        onChange={setExampleDate}
                        min={isValidDate(controls.min as Date) ? (controls.min as Date) : undefined}
                        max={isValidDate(controls.max as Date) ? (controls.max as Date) : undefined}
                        monthPicker={!!controls.monthPicker}
                        forceCustom={!!controls.forceCustom}
                        localeCode={controls.localeCode as string}
                        wrapperProps={{
                            "aria-labelledby": "chooseDate",
                        }}
                    />
                </div>
            }
            code={code}
            controls={renderControls()}
        />
    );
};

function isValidDate(d: Date): boolean {
    return !!(d && d instanceof Date && !isNaN(d.getTime()));
}

export default DatepickerPage;
