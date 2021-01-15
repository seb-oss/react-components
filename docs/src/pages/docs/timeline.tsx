import React from "react";
import Docs from "@common/Docs";
import { Timeline, TimelineDirection, TimelineItem } from "@sebgroup/react-components/Timeline";
import { DynamicFormOption, useDynamicForm } from "@hooks/useDynamicForm";
import { loremIpsum } from "lorem-ipsum";

const importString: string = require("!raw-loader!@sebgroup/react-components/Timeline/Timeline");
const code: string = `<Timeline>
    <TimelineItem header="First item" time="Today">The content goes here</TimelineItem>
    <TimelineItem header="Second item" time="Yesterday">The content goes here</TimelineItem>
</Timeline>`;

const directionList: Array<DynamicFormOption<TimelineDirection>> = [
    { label: "Vertical", value: "vertical", key: "vertical" },
    { label: "Horizontal", value: "horizontal", key: "horizontal" },
];
const contents = [...Array(3)].map(() => loremIpsum({ units: "paragraph" }));

const TimelinePage: React.FC = React.memo(() => {
    const [renderForm, { controls }] = useDynamicForm([
        {
            key: "controls",
            items: [{ key: "direction", label: "Direction", value: directionList[0], options: directionList, controlType: "Radio", inline: true }],
        },
    ]);

    const handleClick: React.MouseEventHandler = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        alert(`Item ${e.currentTarget.dataset.indexNumber} clicked`);
    }, []);

    return (
        <Docs
            mainFile={importString}
            example={
                <Timeline direction={controls.direction.value}>
                    <TimelineItem header="Current Day" time="2016 - Present" onClick={handleClick} data-index-number="0">
                        {contents[0]}
                    </TimelineItem>
                    <TimelineItem header="Previously" time="2012 - 2016" onClick={handleClick} data-index-number="1">
                        {contents[1]}
                    </TimelineItem>
                    <TimelineItem header="At the begining" time="2008 - 2012" onClick={handleClick} data-index-number="2">
                        {contents[2]}
                    </TimelineItem>
                </Timeline>
            }
            code={code}
            controls={renderForm()}
        />
    );
});

export default TimelinePage;
