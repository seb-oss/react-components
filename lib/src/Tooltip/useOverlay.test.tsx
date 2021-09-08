import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import { ElementPosition, OverlayConfig, useOverlay } from "./useOverlay";

type DummyComponentType = {
    show: boolean;
    position?: ElementPosition;
    config?: OverlayConfig;
};

type PositionTestCase = {
    position: ElementPosition;
    mockRefBoundingClientRect: Partial<ClientRect>;
    mockTooltipBoundingClientRect: Partial<ClientRect>;
};

type OverflowTestCase = PositionTestCase & {
    relativePosition: ElementPosition;
};

function DummyComponent({ show, position, config }: DummyComponentType) {
    const ref: React.MutableRefObject<HTMLDivElement> = React.useRef();
    const overlayRef: React.MutableRefObject<HTMLDivElement> = React.useRef();
    const { style, currentPosition } = useOverlay(ref.current, overlayRef.current, show, position, config);
    return (
        <div>
            <div ref={ref} className="reference">
                reference
            </div>
            <div ref={overlayRef} style={style} id="position">
                {currentPosition}
            </div>
        </div>
    );
}

describe("useOverlay", () => {
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

    it("should render top by default", () => {
        act(() => {
            render(<DummyComponent show={false} />, container);
        });
        expect(container.querySelector("#position").textContent).toBe("top");
    });

    it("Should not set auto position if disableAutoPosition is true", async () => {
        act(() => {
            render(<DummyComponent show position={"asd" as any} />, container);
        });
        expect(container.querySelector("#position").textContent).toBe("asd");
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
                act(() => {
                    render(<DummyComponent show={false} />, container);
                });
                (container.querySelector(".reference").getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockRefBoundingClientRect;
                });
                (document.body.querySelector("#position").getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockTooltipBoundingClientRect;
                });
                act(() => {
                    render(<DummyComponent show position={testCase.position} />, container);
                });
                expect(container.querySelector("#position").textContent).toBe(testCase.position);
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
                relativePosition: "bottom-left",
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
                relativePosition: "top-left",
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
                relativePosition: "bottom-left",
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
            test(`able to render on ${testCase.relativePosition} when tooltip is overflow on ${testCase.position}`, () => {
                act(() => {
                    render(<DummyComponent show={false} />, container);
                });
                (container.querySelector(".reference").getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockRefBoundingClientRect;
                });
                (document.body.querySelector("#position").getBoundingClientRect as any) = jest.fn(() => {
                    return testCase.mockTooltipBoundingClientRect;
                });
                act(() => {
                    render(<DummyComponent show position={testCase.position} />, container);
                });
                expect(container.querySelector("#position").textContent).toBe(testCase.relativePosition);
            });
        }
    });
});
