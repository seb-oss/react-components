import React from "react";
import Docs from "@common/Docs";
import { Timer } from "@sebgroup/react-components/Timer";
import { useDynamicForm } from "@hooks/useDynamicForm";
import { Button } from "@sebgroup/react-components/Button";
import PlayIcon from "../../../static/icons/play.svg";
import StopIcon from "../../../static/icons/stop.svg";

const importString: string = require("!raw-loader!@sebgroup/react-components/Timer/Timer");
const code: string = `<Timer active={active} duration={9000} onTimerEnd={onTimerEnd} />`;

const TimerPage: React.FC = () => {
    const [active, setActive] = React.useState<boolean>(false);

    const [renderForm, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [{ key: "duration", value: 90000, label: "Duration (ms)", placeholder: "Duration", controlType: "Text" }],
        },
    ]);

    const onTimerEnd = () => {
        setActive(false);
        alert("Times up!");
    };

    return (
        <Docs
            mainFile={importString}
            example={<Timer active={active} duration={parseInt(controls.duration)} onTimerEnd={onTimerEnd} />}
            code={code}
            controls={
                <>
                    <Button theme={active ? "danger" : "primary"} onClick={() => setActive(!active)}>
                        {active ? (
                            <span>
                                Stop <StopIcon />
                            </span>
                        ) : (
                            <span>
                                Start <PlayIcon />
                            </span>
                        )}
                    </Button>

                    <br />
                    <br />

                    {renderForm()}
                </>
            }
        />
    );
};

export default TimerPage;
