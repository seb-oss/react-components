import React from "react";
import Docs from "@common/Docs";
import { Datepicker } from "@sebgroup/react-components/Datepicker";
import { useDynamicForm } from "@hooks/useDynamicForm";

const importString: string = require("!raw-loader!@sebgroup/react-components/Datepicker/Datepicker");
const code: string = `<Datepicker value={dateValue} onChange={setDateValue} />`;

const DatepickerPage: React.FC = () => {
    const [exampleDate, setExampleDate] = React.useState<Date>(new Date());

    const [renderControls, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [
                { key: "monthPicker", label: "Month picker", description: "Switch to month picker only", controlType: "Checkbox" },
                { key: "forceCustom", label: "Custom date picker", description: "This picker is the automatic fallback on browsers that don't support html5 datepicker", controlType: "Checkbox" },
                {
                    key: "localeCode",
                    rulerKey: "forceCustom",
                    condition: true,
                    label: "Locale code:",
                    description: "Set a locale for the custom picker (defaults to system locale).",
                    controlType: "Text",
                    indent: true,
                },
            ],
        },
    ]);

    return (
        <Docs
            mainFile={importString}
            example={<Datepicker value={exampleDate} onChange={setExampleDate} monthPicker={!!controls.monthPicker} forceCustom={!!controls.forceCustom} localeCode={controls.localeCode as string} />}
            code={code}
            controls={renderControls()}
        />
    );
};

export default DatepickerPage;
