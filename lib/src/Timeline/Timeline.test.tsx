import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import { Timeline, TimelineDirection, TimelineProps } from ".";
import { TimelineItem } from "../TimelineItem";

interface TimelineClickTestCase {
    statement: string;
    props: TimelineProps;
}
interface TimelineItemTestCase {
    statement: string;
    render: () => void;
}

describe("Component: Timeline", () => {
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
            render(<Timeline />, container);
        });

        expect(container.querySelector(`.timeline`)).not.toBeNull();
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("timeline")).toBeTruthy();
        // Default
        expect(container.firstElementChild.classList.contains("vertical")).toBeTruthy();
        expect(container.querySelector("aside")).toBeNull();
    });

    it("Should render children correctly", () => {
        act(() => {
            render(
                <Timeline>
                    <TimelineItem header="Header1" time="Time1">
                        Content1
                    </TimelineItem>
                    <TimelineItem header="Header2" time="Time2">
                        Content1
                    </TimelineItem>
                    <TimelineItem header="Header3" time="Time3">
                        Content1
                    </TimelineItem>
                </Timeline>,
                container
            );
        });

        // 3 items, 3 placeholders, 1 bar
        expect(container.querySelectorAll(".timeline-item")).toHaveLength(3);
        expect(container.querySelectorAll(".timeline-placeholder")).toHaveLength(3);
        expect(container.querySelectorAll(".timeline-bar")).toHaveLength(1);
    });

    it("Should filter out invalid elements", () => {
        act(() => {
            render(
                <Timeline>
                    <TimelineItem header="header" time="time" />
                    invalid
                    <TimelineItem header="header" time="time" />
                </Timeline>,
                container
            );
        });

        expect(container.innerHTML).not.toContain("invalid");
    });

    describe("It should render in both vertical and horizontal directions", () => {
        (["vertical", "horizontal"] as TimelineDirection[]).forEach((direction: TimelineDirection) => {
            test(direction, () => {
                act(() => {
                    render(<Timeline direction={direction} />, container);
                });

                expect(container.firstElementChild.classList.contains(direction)).toBeTruthy();
            });
        });
    });
});
