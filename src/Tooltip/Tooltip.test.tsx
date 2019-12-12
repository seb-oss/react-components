import * as React from "react";
import { Tooltip, TooltipProps, TooltipPosition, TooltipTheme, TooltipTrigger } from "./Tooltip";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

type TriggerTestCase = {
    toggleEvent: Event;
    untoggleEvent: Event;
    trigger: TooltipTrigger;
};

type PositionTestCase = {
    position: TooltipPosition;
    mockRefBoundingClientRect: ClientRect;
    mockTooltipBoundingClientRect: ClientRect;
};

type OverflowTestCase = PositionTestCase & {
    relativePosition: TooltipPosition;
};
describe("Component: Tooltip", () => {
    let container: HTMLDivElement = null;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        document.body.innerHTML = "";
    });

    it("Should render", () => {
        act(() => { render(<Tooltip content="tooltip message"/>, container); });
        expect(container.querySelector(".tooltip-container")).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myTooltipClass";
        const id: string = "myTooltipId";
        act(() => { render(<Tooltip content="tooltip message" id={id} className={className} />, container); });
        expect(container.querySelector(".tooltip-container").classList.contains(className)).toBeTruthy();
        expect(container.querySelector(".tooltip-container").id).toBe(id);
    });

    it("Should render message", () => {
        const content: string = "my tooltip";
        act(() => { render(<Tooltip content={content} />, container); });
        expect(document.body.querySelectorAll(".tooltip-content").length).toBe(1);
        expect(document.body.querySelector(".tooltip-inner").innerHTML).toEqual(content);
    });

    it("Should render node as message", () => {
        const tooltipStr: string = "this is tooltip";
        act(() => { render(<Tooltip content={tooltipStr} />, container); });
        expect(document.body.querySelector(".tooltip-inner").textContent).toBe(tooltipStr);
        const customClassName: string = "__this_is_a_node__";
        const content: React.ReactNode = (<div className={customClassName}><h3>tooltip</h3><div>tooltip body</div></div>);
        act(() => { render(<Tooltip content={content} />, container); });
        expect(document.body.querySelectorAll(".tooltip-content").length).toBe(1);
        expect(document.body.querySelectorAll(`.${customClassName}`).length).toBe(1);
    });

    it("Should render tooltip with one of the supported themes", () => {
        const theme: TooltipTheme = "danger";
        act(() => { render(<Tooltip content="this is tooltip" />, container); });
        expect(document.body.querySelector(".tooltip-content").classList.contains("default")).toBeTruthy();
        act(() => { render(<Tooltip content="this is tooltip" theme={theme} />, container); });
        expect(document.body.querySelector(".tooltip-content").classList.contains(theme)).toBeTruthy();
    });

    it("Should call callback on visibility change if callback is set", () => {
        const callback: jest.Mock = jest.fn();
        act(() => { render(<Tooltip content="this is tooltip" onVisibleChange={callback} />, container); });
        act(() => {
            container.querySelector(".icon").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(callback).toBeCalledTimes(1);
    });

    describe("Should trigger tooltip based on trigger mode", () => {
        const triggerTestCases: Array<TriggerTestCase> = [
            { toggleEvent: new MouseEvent("click", { bubbles: true }), untoggleEvent: new MouseEvent("click", { bubbles: true }), trigger: "click" },
            { toggleEvent: new MouseEvent("contextmenu", { bubbles: true }), untoggleEvent: new MouseEvent("contextmenu", { bubbles: true }), trigger: "rightClick" },
            { toggleEvent: new Event("focus", { bubbles: true }), untoggleEvent: new Event("blur", { bubbles: true }), trigger: "focus" },
            { toggleEvent: new MouseEvent("mouseover", { bubbles: true }), untoggleEvent: new Event("mouseout", { bubbles: true }), trigger: "hover" },
        ];
        triggerTestCases.map((testCase: TriggerTestCase) => {
            it(`Should enable tooltip on ${testCase.trigger} when trigger mode is set to ${testCase.trigger}`, () => {
                act(() => { render(<Tooltip content="this is tooltip" trigger={testCase.trigger} />, container); });
                act(() => {
                    container.querySelector(".icon").dispatchEvent(testCase.toggleEvent);
                });
                expect(document.body.querySelector(".tooltip-content").getAttribute("style")).toContain("block");
                act(() => {
                    container.querySelector(".icon").dispatchEvent(testCase.untoggleEvent);
                });
                expect(document.body.querySelector(".tooltip-content").getAttribute("style")).toContain("none");
            });
        });
    });

    it("Should not set auto position if disableAutoPosition is true", () => {
        act(() => { render(<Tooltip content="tooltip" position={"asd" as any} />, container); });
        act(() => { render(<Tooltip content="tooltip" position={"asd" as any} disableAutoPosition />, container); });
        act(() => {
            container.querySelector(".icon").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(document.body.querySelector(".tooltip-content").classList.contains("asd")).toBeTruthy();
    });

    describe("Should render in all allowed positions", () => {
        const positionTestCases: Array<PositionTestCase> = [
            {
                position: "top",
                mockRefBoundingClientRect: { top: 150, bottom: 0, right: 200, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
            },
            {
                position: "right",
                mockRefBoundingClientRect: { top: 50, bottom: 500, right: 500, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
            },
            {
                position: "bottom",
                mockRefBoundingClientRect: { top: 150, bottom: 500, right: 768, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: 0, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
            },
            {
                position: "left",
                mockRefBoundingClientRect: { top: 50, bottom: 500, right: 1024, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
            },
            {
                position: "top-left",
                mockRefBoundingClientRect: { top: 200, bottom: 768, right: 200, left: 20, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
            },
            {
                position: "top-right",
                mockRefBoundingClientRect: { top: 200, bottom: 300, right: 300, left: 50, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
            },
            {
                position: "bottom-left",
                mockRefBoundingClientRect: { top: 200, bottom: 300, right: 1024, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
            },
            {
                position: "bottom-right",
                mockRefBoundingClientRect: { top: 200, bottom: 300, right: 500, left: 300, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
            },
            {
                position: "left-top",
                mockRefBoundingClientRect: { top: 200, bottom: 500, right: 1024, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
            },
            {
                position: "left-bottom",
                mockRefBoundingClientRect: { top: 50, bottom: 500, right: 1024, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
            },
            {
                position: "right-top",
                mockRefBoundingClientRect: { top: 200, bottom: 0, right: 500, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
            },
            {
                position: "right-bottom",
                mockRefBoundingClientRect: { top: 50, bottom: 500, right: 400, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
            },
        ];
        for (const testCase of positionTestCases) {
            test(`able to render on ${testCase.position}`, () => {
                container.style.position = "relative";
                act(() => { render(<Tooltip content="tooltip" position={testCase.position} />, container); });
                container.querySelector(".tooltip-reference").getBoundingClientRect = jest.fn(() => {
                    return testCase.mockRefBoundingClientRect;
                });
                document.body.querySelector(".tooltip-content").getBoundingClientRect = jest.fn(() => {
                    return testCase.mockTooltipBoundingClientRect;
                });
                act(() => {
                    container.querySelector(".icon").dispatchEvent(new MouseEvent("click", { bubbles: true }));
                });
                expect(document.body.querySelector(".tooltip-content").classList.contains(testCase.position)).toBeTruthy();
            });
        }
    });

    describe("Should render tooltip relatively if overflow", () => {
        const positionTestCases: Array<OverflowTestCase> = [
            {
                position: "top",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 200, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom"
            },
            {
                position: "right",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 768, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom"
            },
            {
                position: "bottom",
                mockRefBoundingClientRect: { top: 150, bottom: 780, right: 768, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: 0, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "top"
            },
            {
                position: "left",
                mockRefBoundingClientRect: { top: 50, bottom: 500, right: 200, left: 0, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "right"
            },
            {
                position: "top-left",
                mockRefBoundingClientRect: { top: 200, bottom: 768, right: 200, left: -100, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "right-top"
            },
            {
                position: "top-right",
                mockRefBoundingClientRect: { top: 0, bottom: 300, right: 50, left: 50, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom"
            },
            {
                position: "bottom-left",
                mockRefBoundingClientRect: { top: 200, bottom: 300, right: 200, left: 720, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom-left"
            },
            {
                position: "bottom-right",
                mockRefBoundingClientRect: { top: 200, bottom: 300, right: 1025, left: 300, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "left"
            },
            {
                position: "left-top",
                mockRefBoundingClientRect: { top: 50, bottom: 500, right: 200, left: 0, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "right"
            },
            {
                position: "left-bottom",
                mockRefBoundingClientRect: { top: 50, bottom: 500, right: 200, left: 0, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "right"
            },
            {
                position: "right-top",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 768, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom"
            },
            {
                position: "right-bottom",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 768, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom"
            },
        ];
        for (const testCase of positionTestCases) {
            test(`able to render on ${testCase.relativePosition} when tooltip is overflow on ${testCase.position}`, () => {
                container.style.position = "relative";
                act(() => { render(<Tooltip content="tooltip" position={testCase.position} />, container); });
                expect(document.body.querySelector(".tooltip-content").classList.contains(testCase.position)).toBeTruthy();
                container.querySelector(".tooltip-reference").getBoundingClientRect = jest.fn(() => {
                    return testCase.mockRefBoundingClientRect;
                });
                document.body.querySelector(".tooltip-content").getBoundingClientRect = jest.fn(() => {
                    return testCase.mockTooltipBoundingClientRect;
                });
                act(() => {
                    container.querySelector(".icon").dispatchEvent(new MouseEvent("click", { bubbles: true }));
                });
                expect(document.body.querySelector(".tooltip-content").classList.contains(testCase.relativePosition)).toBeTruthy();
            });
        }
    });
});
