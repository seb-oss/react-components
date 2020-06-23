import React from "react";
import { Tooltip, TooltipPosition, TooltipTheme, TooltipTrigger, TooltipMessageGroupItem } from "./Tooltip";
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
    mockRefBoundingClientRect: ClientRect;
    mockTooltipBoundingClientRect: ClientRect;
};

type OverflowTestCase = PositionTestCase & {
    relativePosition: TooltipPosition;
};
describe("Component: Tooltip", () => {
    let container: HTMLDivElement = null;

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

    it("Should render", () => {
        act(() => {
            render(<Tooltip content="tooltip message" />, container);
        });
        expect(container.querySelector(".tooltip-container")).toBeDefined();
    });

    it("Should pass custom class and id", () => {
        const className: string = "myTooltipClass";
        const id: string = "myTooltipId";
        act(() => {
            render(<Tooltip content="tooltip message" id={id} className={className} />, container);
        });
        expect(container.querySelector(".tooltip-container").classList.contains(className)).toBeTruthy();
        expect(container.querySelector(".tooltip-container").id).toBe(id);
    });

    it("Should render reference with custom svg if svg is passed", () => {
        const content: string = "test";
        const svg: JSX.Element = <svg>{content}</svg>;
        act(() => {
            render(<Tooltip customSvg={svg} />, container);
        });
        expect(document.body.querySelectorAll(".default-content").length).toBe(1);
        expect(document.body.querySelector(".default-content>svg").innerHTML).toEqual(content);
    });

    it("Should render content", () => {
        const content: string = "my tooltip";
        act(() => {
            render(<Tooltip content={content} />, container);
        });
        expect(document.body.querySelectorAll(".tooltip").length).toBe(1);
        expect(document.body.querySelector(".tooltip-inner").innerHTML).toEqual(content);
    });

    it("Should render message and default message if no message is passed", () => {
        const message: string = "my tooltip";
        act(() => {
            render(<Tooltip />, container);
        });
        expect(document.body.querySelectorAll(".tooltip").length).toBe(1);
        expect(document.body.querySelector(".message-container>.message").innerHTML).toEqual("Tooltip is empty. Please pass a message.");
        act(() => {
            render(<Tooltip message={message} />, container);
        });
        expect(document.body.querySelectorAll(".tooltip").length).toBe(1);
        expect(document.body.querySelector(".message-container>.message").innerHTML).toEqual(message);
    });

    it("Should render message with title", () => {
        const message: string = "my tooltip";
        const title: string = "title";
        act(() => {
            render(<Tooltip message={message} title={title} />, container);
        });
        expect(document.body.querySelectorAll(".tooltip").length).toBe(1);
        expect(document.body.querySelector(".message-container>.title").innerHTML).toEqual(title);
    });

    it("Should render message group", () => {
        const messageGroup: Array<TooltipMessageGroupItem> = [
            {
                title: "Tooltip title",
                message: "tooltip 1",
            },
            {
                message: "tooltip 2",
            },
        ];
        act(() => {
            render(<Tooltip messageGroup={messageGroup} />, container);
        });
        expect(document.body.querySelectorAll(".tooltip").length).toBe(1);
        expect(document.body.querySelectorAll(".message-list-item").length).toEqual(messageGroup.length);
    });

    it("Should render node as message", () => {
        const tooltipStr: string = "this is tooltip";
        act(() => {
            render(<Tooltip content={tooltipStr} />, container);
        });
        expect(document.body.querySelector(".tooltip-inner").textContent).toBe(tooltipStr);
        const customClassName: string = "__this_is_a_node__";
        const content: React.ReactNode = (
            <div className={customClassName}>
                <h3>tooltip</h3>
                <div>tooltip body</div>
            </div>
        );
        act(() => {
            render(<Tooltip content={content} />, container);
        });
        expect(document.body.querySelectorAll(".tooltip").length).toBe(1);
        expect(document.body.querySelectorAll(`.${customClassName}`).length).toBe(1);
    });

    it("Should render tooltip with one of the supported themes", () => {
        const theme: TooltipTheme = "danger";
        act(() => {
            render(<Tooltip content="this is tooltip" />, container);
        });
        expect(document.body.querySelector(".tooltip").classList.contains("default")).toBeTruthy();
        act(() => {
            render(<Tooltip content="this is tooltip" theme={theme} />, container);
        });
        expect(document.body.querySelector(".tooltip").classList.contains(theme)).toBeTruthy();
    });

    it("Should call callback on visibility change if callback is set", () => {
        const callback: jest.Mock = jest.fn();
        act(() => {
            render(<Tooltip content="this is tooltip" onVisibleChange={callback} />, container);
        });
        act(() => {
            container.querySelector(".default-content").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(callback).toBeCalledTimes(1);
    });

    it("Should be able to force show and force hide the tooltip from another component", () => {
        const content: string = "my tooltip";
        let myTooltip: Tooltip;
        let forceShowSpy: jest.SpyInstance;
        let forceDismissSpy: jest.SpyInstance;
        const toggleTooltip: () => void = () => {
            const isToggled: boolean = document.body.querySelector(".overlay-container.show") !== null;
            if (isToggled) {
                myTooltip.forceDismiss();
            } else {
                myTooltip.forceShow();
            }
        };
        act(() => {
            render(
                <div>
                    <button onClick={toggleTooltip}>click</button>
                    <Tooltip
                        content={content}
                        ref={(el: Tooltip) => {
                            myTooltip = el;
                        }}
                    />
                </div>,
                container
            );
            forceShowSpy = jest.spyOn(myTooltip, "forceShow");
            forceDismissSpy = jest.spyOn(myTooltip, "forceDismiss");
        });
        act(() => {
            container.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(forceShowSpy).toBeCalledTimes(1);
        act(() => {
            container.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(forceDismissSpy).toBeCalledTimes(1);
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
                untoggleEventElementClass: ".overlay-container",
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
            it(`Should enable tooltip on ${testCase.trigger} when trigger mode is set to ${testCase.trigger}`, () => {
                act(() => {
                    render(<Tooltip content="this is tooltip" trigger={testCase.trigger} />, container);
                });
                act(() => {
                    container.querySelector(".default-content").dispatchEvent(testCase.toggleEvent);
                });
                expect(document.body.querySelector(".overlay-container.show")).toBeDefined();
                act(() => {
                    document.body.querySelector(testCase.untoggleEventElementClass).dispatchEvent(testCase.untoggleEvent);
                });
                expect(document.body.querySelector(".overlay-container.show")).toBeNull();
            });
        });
    });

    it("Should not set auto position if disableAutoPosition is true", () => {
        act(() => {
            render(<Tooltip content="tooltip" position={"asd" as any} />, container);
        });
        act(() => {
            render(<Tooltip content="tooltip" position={"asd" as any} disableAutoPosition />, container);
        });
        act(() => {
            container.querySelector(".default-content").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
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
            test(`able to render on ${testCase.position}`, () => {
                container.style.position = "relative";
                act(() => {
                    render(<Tooltip content="tooltip" position={testCase.position} />, container);
                });
                (container.querySelector(".tooltip-reference").getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockRefBoundingClientRect;
                });
                (document.body.querySelector(".tooltip").getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockTooltipBoundingClientRect;
                });
                act(() => {
                    container.querySelector(".default-content").dispatchEvent(new MouseEvent("click", { bubbles: true }));
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
                mockRefBoundingClientRect: { top: 200, bottom: 768, right: 200, left: -100, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "right",
            },
            {
                position: "top-right",
                mockRefBoundingClientRect: { top: 0, bottom: 600, right: 1025, left: 0, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: 0, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "top",
            },
            {
                position: "bottom-left",
                mockRefBoundingClientRect: { top: 200, bottom: 300, right: 200, left: 720, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
                relativePosition: "bottom-left",
            },
            {
                position: "bottom-right",
                mockRefBoundingClientRect: { top: 200, bottom: 300, right: 1025, left: 300, height: 100, width: 50 },
                mockTooltipBoundingClientRect: { top: -100, bottom: 0, right: 0, left: 0, height: 100, width: 100 },
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
                relativePosition: "bottom-right",
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
            test(`able to render on ${testCase.relativePosition} when tooltip is overflow on ${testCase.position}`, () => {
                container.style.position = "relative";
                act(() => {
                    render(<Tooltip content="tooltip" position={testCase.position} />, container);
                });
                expect(document.body.querySelector(".overlay-container").classList.contains(testCase.position)).toBeTruthy();
                (container.querySelector(".tooltip-reference").getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockRefBoundingClientRect;
                });
                (document.body.querySelector(".tooltip").getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockTooltipBoundingClientRect;
                });
                act(() => {
                    container.querySelector(".default-content").dispatchEvent(new MouseEvent("click", { bubbles: true }));
                });
                expect(document.body.querySelector(".overlay-container").classList.contains(testCase.relativePosition)).toBeTruthy();
            });
        }
    });

    it("Should retain tooltip if user click on tooltip reference on focus mode", () => {
        let tooltip: Tooltip;
        act(() => {
            render(<Tooltip ref={(e: Tooltip) => (tooltip = e)} content="this is tooltip" trigger="focus" />, container);
        });
        act(() => {
            container.querySelector(".default-content").dispatchEvent(new Event("focus", { bubbles: true }));
        });
        expect(document.body.querySelector(".overlay-container.show")).toBeDefined();
        act(() => {
            tooltip.onTooltipContentBlur({ relatedTarget: container.querySelector(".default-content") } as any);
        });
        expect(document.body.querySelector(".overlay-container.show")).toBeDefined();
    });
});
