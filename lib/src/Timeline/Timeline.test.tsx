import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { Timeline, TimelineItemProps, TimelineProps } from ".";
import TimelineItem from "./TimelineItem";

interface TimelineClickTestCase {
    statement: string;
    props: TimelineProps;
}
interface TimelineItemTestCase {
    statement: string;
    render: () => void;
}

describe("Component: Timeline", () => {
    const timelineList: Array<TimelineItemProps> = [
        { title: "title1", time: "time1" },
        { title: "title2", time: "time2" },
        { title: "title3", time: "time3" },
        { title: "title4", time: "time4", desc: "desc4" },
        { title: "title5", time: "time5", desc: "desc5" },
    ];
    const props: TimelineProps = {
        list: timelineList,
        onClick: jest.fn(),
    };
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render", () => {
        act(() => {
            render(<Timeline {...props} />, container);
        });
        expect(container.querySelector(`.timeline`)).not.toBeNull();
    });

    it("Should pass a custom class and id", () => {
        const className: string = "mySteptrackerClass";
        const id: string = "mySteptrackerId";
        act(() => {
            render(<Timeline {...props} className={className} id={id} />, container);
        });
        expect(container.querySelector(`.${className}`)).not.toBeNull();
        expect(container.querySelector(`#${id}`)).not.toBeNull();
    });

    it("Should render in horizontal if direction prop is set to `horizontal`", () => {
        act(() => {
            render(<Timeline {...props} />, container);
        });
        expect(container.querySelector(`.timeline`).classList).toContain("vertical");
        act(() => {
            render(<Timeline {...props} direction="horizontal" />, container);
        });
        expect(container.querySelector(`.timeline`).classList).toContain("horizontal");
    });

    describe("Should fire click event if onClick is passed", () => {
        const testCases: Array<TimelineClickTestCase> = [
            { statement: "on vertical", props: { ...props } },
            { statement: "on horizontal", props: { ...props, direction: "horizontal" } },
        ];
        testCases.map((item: TimelineClickTestCase) => {
            it(item.statement, () => {
                act(() => {
                    render(<Timeline {...item.props} />, container);
                });
                act(() => {
                    Simulate.click(container.querySelector(".title-wrapper"));
                });
                expect(item.props.onClick).toBeCalled();
            });
        });
    });

    describe("Should render timeline item title, time and description with differen render method", () => {
        const testCases: Array<TimelineItemTestCase> = [
            {
                statement: "render using list",
                render: () => {
                    render(<Timeline {...props} />, container);
                },
            },
            {
                statement: "render using component",
                render: () => {
                    render(
                        <Timeline>
                            {timelineList.map((item: TimelineItemProps, i: number) => (
                                <TimelineItem key={i} {...item} />
                            ))}
                        </Timeline>,
                        container
                    );
                },
            },
        ];
        testCases.map((item: TimelineItemTestCase) => {
            it(item.statement, () => {
                act(() => {
                    item.render();
                });
                timelineList.map((listItem: TimelineItemProps, index: number) => {
                    const node: Element = container.querySelectorAll(".title-wrapper")[index];
                    expect(node.querySelector(".title").textContent).toBe(listItem.title);
                    expect(node.querySelector(".time").textContent).toBe(listItem.time);
                    if (listItem.desc) {
                        expect(node.querySelector(".desc")).not.toBeNull();
                        expect(node.querySelector(".desc").textContent).toBe(listItem.desc);
                    } else {
                        expect(node.querySelector(".desc")).toBeNull();
                    }
                });
            });
        });
    });
});
