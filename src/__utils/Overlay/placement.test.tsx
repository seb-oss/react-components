import * as React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import { OverlayPositionChecker, ElementPosition } from "./placement";

// type TriggerTestCase = {
//     toggleEvent: Event;
//     toggleEventElementClass: string;
//     untoggleEvent: Event;
//     untoggleEventElementClass: string;
//     trigger: TooltipTrigger;
// };

type PositionTestCase = {
    position: ElementPosition;
    mockRefBoundingClientRect: ClientRect;
    mockTooltipBoundingClientRect: ClientRect;
};

type OverflowTestCase = PositionTestCase & {
    relativePosition: ElementPosition;
};

describe("Placement class", () => {
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
        act(() => { render(<div className="wrapper"><div className="reference">ref</div><div className="overlay">overlay</div></div>, container); });
        const checker: OverlayPositionChecker = new OverlayPositionChecker(container.querySelector(".reference"), false);
        expect(checker).toBeDefined();
    });

    it("Should throw error if overlay container is not set", () => {
        act(() => { render(<div className="wrapper"><div className="reference">ref</div><div className="overlay">overlay</div></div>, container); });
        const checker: OverlayPositionChecker = new OverlayPositionChecker(container.querySelector(".reference"), true);
        checker.addOverlayContainer(null);
        try {
            checker.getPosition(null);
        } catch (error) {
            expect(error).toBeInstanceOf(TypeError);
            expect(error).toHaveProperty("message", "Cannot read property 'getBoundingClientRect' of undefined");
        }
    });

    it("Should render null position", () => {
        act(() => { render(<div className="wrapper"><div className="reference">ref</div><div className="overlay">overlay</div></div>, container); });
        const checker: OverlayPositionChecker = new OverlayPositionChecker(container.querySelector(".reference"), true);
        checker.addOverlayContainer(container.querySelector(".overlay"));
        expect(checker.getPosition(null)).toStrictEqual({ coord: null, position: null });
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
                mockRefBoundingClientRect: { top: 200, bottom: 500, right: 500, left: 200, height: 100, width: 50 },
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
                act(() => { render(<div className="wrapper"><div className="reference">ref</div><div className="overlay">overlay</div></div>, container); });
                const referenceElement: HTMLDivElement = container.querySelector(".reference");
                const overlayElement: HTMLDivElement = container.querySelector(".overlay");
                const checker: OverlayPositionChecker = new OverlayPositionChecker(referenceElement, false);
                checker.addOverlayContainer(overlayElement);
                (referenceElement.getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockRefBoundingClientRect;
                });
                (overlayElement.getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockTooltipBoundingClientRect;
                });
                expect(checker.getPosition(testCase.position).position === testCase.position).toBeTruthy();
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
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 768, left: 0, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom-left"
            },
            {
                position: "top-left",
                mockRefBoundingClientRect: { top: 200, bottom: 768, right: 200, left: -100, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "right"
            },
            {
                position: "top-right",
                mockRefBoundingClientRect: { top: 0, bottom: 600, right: 1025, left: 0, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: 0, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom-left"
            },
            {
                position: "bottom-left",
                mockRefBoundingClientRect: { top: 200, bottom: 300, right: 200, left: -500, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "right"
            },
            {
                position: "bottom-right",
                mockRefBoundingClientRect: { top: 200, bottom: 300, right: 1025, left: 300, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "top"
            },
            {
                position: "left-top",
                mockRefBoundingClientRect: { top: 50, bottom: 50, right: 200, left: 0, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom-left"
            },
            {
                position: "left-bottom",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 500, left: -500, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom-right"
            },
            {
                position: "right-top",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 768, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom"
            },
            {
                position: "right-bottom",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: window.innerWidth + 200, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom"
            },
        ];
        for (const testCase of positionTestCases) {
            test(`able to render on ${testCase.relativePosition} when tooltip is overflow on ${testCase.position}`, () => {
                container.style.position = "relative";
                act(() => { render(<div className="wrapper"><div className="reference">ref</div><div className="overlay">overlay</div></div>, container); });
                const referenceElement: HTMLDivElement = container.querySelector(".reference");
                const overlayElement: HTMLDivElement = container.querySelector(".overlay");
                const checker: OverlayPositionChecker = new OverlayPositionChecker(referenceElement, false);
                checker.addOverlayContainer(overlayElement);
                (referenceElement.getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockRefBoundingClientRect;
                });
                (overlayElement.getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockTooltipBoundingClientRect;
                });
                expect(checker.getPosition(testCase.position).position === testCase.relativePosition).toBeTruthy();
            });
        }
    });

    describe("Should render tooltip position to default position if overflow and auto position disabled", () => {
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
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 768, left: 0, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom-left"
            },
            {
                position: "top-left",
                mockRefBoundingClientRect: { top: 200, bottom: 768, right: 200, left: -100, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "right"
            },
            {
                position: "top-right",
                mockRefBoundingClientRect: { top: 0, bottom: 600, right: 1025, left: 0, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: 0, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom-left"
            },
            {
                position: "bottom-left",
                mockRefBoundingClientRect: { top: 200, bottom: 300, right: 200, left: -500, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "right"
            },
            {
                position: "bottom-right",
                mockRefBoundingClientRect: { top: 200, bottom: 300, right: 1025, left: 300, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "top"
            },
            {
                position: "left-top",
                mockRefBoundingClientRect: { top: 50, bottom: 50, right: 200, left: 0, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom-left"
            },
            {
                position: "left-bottom",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 500, left: -500, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom-right"
            },
            {
                position: "right-top",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 768, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom"
            },
            {
                position: "right-bottom",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: window.innerWidth + 200, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom"
            },
        ];
        for (const testCase of positionTestCases) {
            test(`able to render on ${testCase.position} when tooltip is overflow on ${testCase.position}`, () => {
                container.style.position = "relative";
                act(() => { render(<div className="wrapper"><div className="reference">ref</div><div className="overlay">overlay</div></div>, container); });
                const referenceElement: HTMLDivElement = container.querySelector(".reference");
                const overlayElement: HTMLDivElement = container.querySelector(".overlay");
                const checker: OverlayPositionChecker = new OverlayPositionChecker(referenceElement, false);
                checker.addOverlayContainer(overlayElement);
                (referenceElement.getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockRefBoundingClientRect;
                });
                (overlayElement.getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockTooltipBoundingClientRect;
                });
                checker.disableAutoPlacement(true);
                expect(checker.getPosition(testCase.position).position === testCase.position).toBeTruthy();
            });
        }
    });
});
