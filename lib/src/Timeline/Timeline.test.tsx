import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import { Timeline, TimelineDirection } from ".";

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
                    <Timeline.Item header="Header1" time="Time1">
                        Content1
                    </Timeline.Item>
                    <Timeline.Item header="Header2" time="Time2">
                        Content1
                    </Timeline.Item>
                    <Timeline.Item header="Header3" time="Time3">
                        Content1
                    </Timeline.Item>
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
                    <Timeline.Item header="header" time="time" />
                    invalid
                    <Timeline.Item header="header" time="time" />
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
