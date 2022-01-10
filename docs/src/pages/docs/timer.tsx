import React from "react";
import Docs from "@common/Docs";
import { Timer } from "@sebgroup/react-components/Timer";
import { DynamicFormSection, useDynamicForm } from "@sebgroup/react-components/hooks/useDynamicForm";

const importString: string = require("!raw-loader!@sebgroup/react-components/Timer/Timer");
const code: string = `<Timer duration={90000} callback={() => { console.log("TIMER ENDED callback"); }} />`;

const TimerPage: React.FC = () => {
    const defaultTimer: number = 90000;
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                {
                    key: "duration",
                    initialValue: defaultTimer,
                    label: "Duration (ms)",
                    placeholder: "Duration",
                    controlType: "Text",
                },
            ],
        },
    ];
    const {
        renderForm,
        state: { controls },
    } = useDynamicForm(fields);

    return <Docs mainFile={importString} example={<Timer duration={Number(controls.duration) || defaultTimer} callback={() => {}} />} code={code} controls={renderForm()} />;
};

export default TimerPage;
