import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { ResizeHandle, ResizeHandleProps } from "./ResizeHandle";
import { act, Simulate } from "react-dom/test-utils";

describe("Component: ImageCropper - ResizeHandle", () => {
    let container: HTMLDivElement = null;
    const props: ResizeHandleProps = {
        coordinates: { top: 0, left: 0, bottom: 180, right: 180 },
        position: "top-left",
        handleResize: jest.fn(),
    };

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render correctly", () => {
        act(() => {
            render(<ResizeHandle {...props} />, container);
        });
        expect(container).toBeDefined();
        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("div");
        expect(container.firstElementChild.classList.contains("handle")).toBeTruthy();
        expect(container.firstElementChild.classList.contains(props.position)).toBeTruthy();
        expect(container.firstElementChild.getAttribute("draggable")).toBe("false");
    });

    it("Should call handleresize on mouse or touch", () => {
        act(() => {
            render(<ResizeHandle {...props} />, container);
        });

        act(() => Simulate.mouseDown(container.firstElementChild));
        act(() => Simulate.touchStart(container.firstElementChild));

        expect(props.handleResize).toBeCalledTimes(2);
    });

    describe("Should be positioned correctly", () => {
        const testProps: ResizeHandleProps = {
            coordinates: { top: 15, left: 15, bottom: 150, right: 150 },
            position: null,
            handleResize: jest.fn(),
        };

        interface TestCase {
            position: ResizeHandleProps["position"];
            expected: string;
        }

        const testCases: TestCase[] = [
            { position: "top-left", expected: "top: 15px; left: 15px" },
            { position: "top-right", expected: "top: 15px; left: 140px" },
            { position: "bottom-left", expected: "top: 140px; left: 15px" },
            { position: "bottom-right", expected: "top: 140px; left: 140px" },
        ];

        testCases.forEach((testCase: TestCase) => {
            test(`Position: ${testCase.position} - Align: ${testCase.expected}`, () => {
                act(() => {
                    render(<ResizeHandle {...testProps} position={testCase.position} />, container);
                });

                expect(container.firstElementChild.getAttribute("style")).toContain(testCase.expected);
            });
        });
    });
});
