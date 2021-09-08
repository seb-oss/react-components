import React from "react";
import { Tooltip, TooltipPosition, TooltipTheme, TooltipTrigger } from ".";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

type TriggerTestCase = {
    toggleEvent: Event;
    toggleEventElementClass: string;
    untoggleEvent: Event;
    untoggleEventElementClass: string;
    trigger: TooltipTrigger;
};

type PositionTestCase = {
    position: TooltipPosition;
    mockRefBoundingClientRect: Partial<ClientRect>;
    mockTooltipBoundingClientRect: Partial<ClientRect>;
};

type OverflowTestCase = PositionTestCase & {
    relativePosition: TooltipPosition;
};
describe("Component: Tooltip", () => {
    let container: HTMLDivElement = null;

    const toggleTooltip = async () => {
        await act(async () => {
            container.querySelector(".default-content").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
    };

    beforeAll(() => {
        jest.spyOn(console, "warn").mockImplementation(() => null);
    });

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

    it("Should render", async () => {
        await act(async () => {
            render(<Tooltip content="tooltip message" />, container);
        });
        expect(container.querySelector(".tooltip-container")).toBeDefined();
    });

    it("Should pass custom class and id", async () => {
        const className: string = "myTooltipClass";
        const id: string = "myTooltipId";
        await act(async () => {
            render(<Tooltip content="tooltip message" id={id} className={className} />, container);
        });
        expect(container.querySelector(".tooltip-container").classList.contains(className)).toBeTruthy();
        expect(container.querySelector(".tooltip-container").id).toBe(id);
    });

    it("Should set text-help to reference if children passed is string", async () => {
        await act(async () => {
            render(<Tooltip content="tooltip message">reference</Tooltip>, container);
        });
        expect(container.querySelector(".text-help")).not.toBeNull();
    });

    it("Should render custom reference node as a single node", async () => {
        const customClassName: string = "custom-reference";
        await act(async () => {
            render(
                <Tooltip content="tooltip message">
                    <div className={customClassName}>reference</div>
                </Tooltip>,
                container
            );
        });
        expect(container.querySelector(`.${customClassName}`)).not.toBeNull();
    });

    it("Should render custom reference node", async () => {
        const customClassName: string = "custom-reference";
        const customClassName2: string = "custom-reference-2";
        await act(async () => {
            render(
                <Tooltip content="tooltip message">
                    <div className={customClassName}>reference</div>
                    <div className={customClassName2}>reference2</div>
                </Tooltip>,
                container
            );
        });
        expect(container.querySelector(`.${customClassName}`)).not.toBeNull();
        expect(container.querySelector(`.${customClassName2}`)).not.toBeNull();
    });

    it("Should render content", async () => {
        const content: string = "my tooltip";
        await act(async () => {
            render(<Tooltip content={content} />, container);
        });
        await toggleTooltip();
        expect(document.body.querySelectorAll(".tooltip").length).toBe(1);
        expect(document.body.querySelector(".tooltip-inner").innerHTML).toEqual(content);
    });

    it("Should render node as message", async () => {
        const tooltipStr: string = "this is tooltip";
        await act(async () => {
            render(<Tooltip content={tooltipStr} />, container);
        });
        await toggleTooltip();
        expect(document.body.querySelector(".tooltip-inner").textContent).toBe(tooltipStr);
        const customClassName: string = "__this_is_a_node__";
        const content: React.ReactNode = (
            <div className={customClassName}>
                <h3>tooltip</h3>
                <div>tooltip body</div>
            </div>
        );
        await act(async () => {
            render(<Tooltip content={content} />, container);
        });
        expect(document.body.querySelectorAll(".tooltip").length).toBe(1);
        expect(document.body.querySelectorAll(`.${customClassName}`).length).toBe(1);
    });

    it("Should render tooltip with one of the supported themes", async () => {
        const theme: TooltipTheme = "danger";
        await act(async () => {
            render(<Tooltip content="this is tooltip" />, container);
        });
        await toggleTooltip();
        expect(document.body.querySelector(".tooltip").classList.contains("default")).toBeTruthy();
        await act(async () => {
            render(<Tooltip content="this is tooltip" theme={theme} />, container);
        });
        expect(document.body.querySelector(".tooltip").classList.contains(theme)).toBeTruthy();
    });

    it("Should call callback on visibility change if callback is set", async () => {
        const callback: jest.Mock = jest.fn();
        await act(async () => {
            render(<Tooltip content="this is tooltip" onVisibleChange={callback} />, container);
        });
        await toggleTooltip();
        expect(callback).toBeCalledTimes(1);
    });

    it("Should be able to force show the tooltip from another component", async () => {
        const content: string = "my tooltip";
        await act(async () => {
            render(<Tooltip content={content} forceShow />, container);
        });
        expect(document.body.querySelector(".overlay-container.show")).toBeDefined();
    });

    describe("Should trigger tooltip based on trigger mode", () => {
        const triggerTestCases: Array<TriggerTestCase> = [
            {
                toggleEvent: new MouseEvent("click", { bubbles: true }),
                toggleEventElementClass: ".default-content",
                untoggleEvent: new MouseEvent("click", { bubbles: true }),
                untoggleEventElementClass: ".default-content",
                trigger: "click",
            },
            {
                toggleEvent: new Event("focus", { bubbles: true }),
                toggleEventElementClass: ".default-content",
                untoggleEvent: new Event("blur", { bubbles: true }),
                untoggleEventElementClass: ".default-content",
                trigger: "focus",
            },
            {
                toggleEvent: new MouseEvent("mouseover", { bubbles: true }),
                toggleEventElementClass: ".default-content",
                untoggleEvent: new Event("mouseout", { bubbles: true }),
                untoggleEventElementClass: ".default-content",
                trigger: "hover",
            },
            {
                toggleEvent: new TouchEvent("touchstart", { bubbles: true }),
                toggleEventElementClass: ".default-content",
                untoggleEvent: new Event("touchend", { bubbles: true }),
                untoggleEventElementClass: ".default-content",
                trigger: "hover",
            },
        ];
        triggerTestCases.map((testCase: TriggerTestCase) => {
            it(`Should enable tooltip on ${testCase.trigger} when trigger mode is set to ${testCase.trigger}`, async () => {
                await act(async () => {
                    render(<Tooltip content="this is tooltip" trigger={testCase.trigger} />, container);
                });
                await act(async () => {
                    container.querySelector(".default-content").dispatchEvent(testCase.toggleEvent);
                });
                expect(document.body.querySelector(".overlay-container.show")).toBeDefined();
                await act(async () => {
                    document.body.querySelector(testCase.untoggleEventElementClass).dispatchEvent(testCase.untoggleEvent);
                });
                expect(document.body.querySelector(".overlay-container.show")).toBeNull();
            });
        });
    });

    it("Should not set auto position if disableAutoPosition is true", async () => {
        await act(async () => {
            render(<Tooltip content="tooltip" position={"asd" as any} />, container);
        });
        await act(async () => {
            render(<Tooltip content="tooltip" position={"asd" as any} disableAutoPosition />, container);
        });
        await toggleTooltip();
        expect(document.body.querySelector(".overlay-container").classList.contains("asd")).toBeTruthy();
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
            test(`able to render on ${testCase.position}`, async () => {
                container.style.position = "relative";
                await act(async () => {
                    render(<Tooltip content="tooltip" position={testCase.position} />, container);
                });
                await toggleTooltip();
                (container.querySelector(".tooltip-reference").getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockRefBoundingClientRect;
                });
                (document.body.querySelector(".tooltip").getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockTooltipBoundingClientRect;
                });
                expect(document.body.querySelector(".overlay-container").classList.contains(testCase.position)).toBeTruthy();
            });
        }
    });

    describe("Should render tooltip relatively if overflow", () => {
        const positionTestCases: Array<OverflowTestCase> = [
            {
                position: "top",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 200, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom",
            },
            {
                position: "right",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 768, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom",
            },
            {
                position: "bottom",
                mockRefBoundingClientRect: { top: 150, bottom: 780, right: 768, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: 0, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "top",
            },
            {
                position: "left",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 768, left: 0, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom",
            },
            {
                position: "top-left",
                mockRefBoundingClientRect: { top: -100, bottom: 768, right: 200, left: -100, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "right",
            },
            {
                position: "top-right",
                mockRefBoundingClientRect: { top: -100, bottom: 600, right: -100, left: 720, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: -100, left: 0, height: 100, width: 100 },
                relativePosition: "left",
            },
            {
                position: "bottom-left",
                mockRefBoundingClientRect: { top: 200, bottom: -300, right: 720, left: 0, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: 0, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "top",
            },
            {
                position: "bottom-right",
                mockRefBoundingClientRect: { top: 200, bottom: -300, right: -100, left: 720, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: 0, bottom: 0, right: -200, left: 0, height: 100, width: 100 },
                relativePosition: "top",
            },
            {
                position: "left-top",
                mockRefBoundingClientRect: { top: 50, bottom: 50, right: 200, left: 0, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "top",
            },
            {
                position: "left-bottom",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 500, left: -500, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom-left",
            },
            {
                position: "right-top",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: 768, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom",
            },
            {
                position: "right-bottom",
                mockRefBoundingClientRect: { top: -100, bottom: 0, right: window.innerWidth + 200, left: 200, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom",
            },
        ];
        for (const testCase of positionTestCases) {
            test(`able to render on ${testCase.relativePosition} when tooltip is overflow on ${testCase.position}`, async () => {
                container.style.position = "relative";
                await act(async () => {
                    render(<Tooltip content="tooltip" position={testCase.position} />, container);
                });
                await toggleTooltip();
                expect(document.body.querySelector(".overlay-container").classList.contains(testCase.position)).toBeTruthy();
                (container.querySelector(".tooltip-reference").getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockRefBoundingClientRect;
                });
                (document.body.querySelector(".tooltip").getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockTooltipBoundingClientRect;
                });
                await toggleTooltip(); // update bounding client rect
                await toggleTooltip();
                expect(document.body.querySelector(".overlay-container").classList.contains(testCase.relativePosition)).toBeTruthy();
            });
        }
    });
});
