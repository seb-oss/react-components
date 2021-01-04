import React from "react";
import Docs from "@common/Docs";
import { Timer } from "@sebgroup/react-components/Timer";
import { DynamicFormSection, useDynamicForm } from "@hooks/useDynamicForm";

const TimerPage: React.FC = () => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Timer/Timer");
    const defaultTimer: number = 90000;
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                {
                    key: "duration",
                    value: defaultTimer,
                    label: "Duration (ms)",
                    placeholder: "Duration",
                    controlType: "Text",
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const code: string = `<Timer duration={90000} callback={() => { console.log("TIMER ENDED callback"); }} />`;

    return <Docs mainFile={importString} example={<Timer duration={(controls as any)?.duration || defaultTimer} callback={() => {}} />} code={code} controls={renderForm()} />;
};

export default TimerPage;
