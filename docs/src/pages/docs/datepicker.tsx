import React, { useEffect } from "react";
import Docs from "@common/Docs";
import { Datepicker } from "@sebgroup/react-components/Datepicker";
import { useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";

const importString: string = require("!raw-loader!@sebgroup/react-components/Datepicker/Datepicker");
const code: string = `<Datepicker value={dateValue} onChange={setDateValue} />`;

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
    }, [controls.forceCustom]);

    return (
        <Docs
            mainFile={importString}
            example={
                <div className="w-100">
                    <label id="chooseDate">Choose a date:</label>
                    <Datepicker
                        value={exampleDate}
                        onChange={setExampleDate}
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

export default DatepickerPage;
