import React from "react";
import Docs from "components/Docs";
import { Timeline, TimelineItemProps } from "@sebgroup/react-components/Timeline";
import { DynamicFormOption, DynamicFormSection, useDynamicForm } from "hooks/useDynamicForm";
import TimelineItem from "@sebgroup/react-components/Timeline/TimelineItem";

const TimelinePage: React.FC = React.memo(() => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Timeline/Timeline");
    const directionList: Array<DynamicFormOption> = [
        { label: "vertical", value: "vertical", key: "vertical" },
        { label: "horizontal", value: "horizontal", key: "horizontal" },
    ];
    const fields: Array<DynamicFormSection> = [
        {
            key: "controls",
            items: [
                {
                    key: "direction",
                    value: directionList[0],
                    label: "Direction",
                    options: directionList,
                    controlType: "Dropdown",
                },
            ],
        },
    ];
    const [renderForm, { controls }] = useDynamicForm(fields);
    const list: Array<TimelineItemProps> = React.useMemo(
        () => [
            {
                title: "Current Day",
                time: "2016 - Present",
                desc: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae semper quis lectus nulla at volutpat.",
            },
            {
                title: "Previously",
                time: "2012 - 2016",
                desc: "Leo in vitae turpis massa sed elementum tempus egestas sed. Suspendisse ultrices gravida dictum fusce ut.",
            },
            {
                title: "At the begining",
                time: "2008 - 2012",
                desc: "Fermentum dui faucibus in ornare quam viverra orci. Vitae tempus quam pellentesque nec. Praesent tristique magna sit amet purus gravida.",
            },
        ],
        []
    );
    const code: string = `<Timeline list="{timelineListObj}" />`;

    return (
        <Docs
            mainFile={importString}
            example={
                <Timeline
                    onClick={(i: number) => {
                        alert(`Item ${i} clicked`);
                    }}
                    direction={(controls as any)?.direction?.value || directionList[0].value}
                >
                    {list.map((item: TimelineItemProps, i: number) => (
                        <TimelineItem key={i} {...item} />
                    ))}
                </Timeline>
            }
            code={code}
            controls={renderForm()}
        />
    );
});

export default TimelinePage;
