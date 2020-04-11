import * as React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import { ElementPosition } from "./placement";
import { Overlay, OverlayProps } from "./Overlay";

type PositionTestCase = {
    position: ElementPosition;
    mockRefBoundingClientRect: ClientRect;
    mockTooltipBoundingClientRect: ClientRect;
};

describe("Component: Overlay", () => {
    let container: HTMLDivElement = null;
    const overlayProps: OverlayProps = {
        overlayReference: null,
        onBlur: jest.fn(),
        show: false
    };
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
        const newProps: OverlayProps = { ...overlayProps, overlayReference: () => container.querySelector(".ref") };
        act(() => { render(<div><div className="ref">ref</div><Overlay {...newProps}>overlay</Overlay></div>, container); });
        expect(document.body.querySelector(".overlay-container")).toBeTruthy();
    });

    it("Should render content", () => {
        const content: string = "my overlay";
        const newProps: OverlayProps = { ...overlayProps, overlayReference: () => container.querySelector(".ref") };
        act(() => { render(<div><div className="ref">ref</div><Overlay {...newProps}>{content}</Overlay></div>, container); });
        const overlayContainer: Element = document.body.querySelector(".overlay-container");
        expect(overlayContainer).toBeTruthy();
        expect(overlayContainer.innerHTML).toEqual(content);
    });

    it("Should be set to focus on overlay show", () => {
        const newProps: OverlayProps = { ...overlayProps, overlayReference: () => container.querySelector(".ref") };
        act(() => { render(<div><div className="ref">ref</div><Overlay {...newProps}>overlay</Overlay></div>, container); });
        expect(document.body.querySelector(".overlay-container:focus")).toBeFalsy();
        const updatedProps: OverlayProps = { ...newProps, show: true };
        act(() => { render(<div><div className="ref">ref</div><Overlay {...updatedProps}>overlay</Overlay></div>, container); });
        expect(document.body.querySelector(".overlay-container:focus")).toBeTruthy();
    });

    // it("Should update position on scroll", () => {
    //     const newProps: OverlayProps = { ...overlayProps, overlayReference: () => container.querySelector(".ref") };
    //     act(() => { render(<div><div className="ref">ref</div><Overlay {...newProps}>overlay</Overlay></div>, container); });
    //     expect(document.body.querySelector(".overlay-container:focus")).toBeFalsy();
    //     const updatedProps: OverlayProps = { ...newProps, show: true };
    //     act(() => { render(<div className="ref-holder"><div className="ref">ref</div><Overlay {...updatedProps}>overlay</Overlay></div>, container); });
    //     expect(document.body.querySelector(".overlay-container:focus")).toBeTruthy();
    //     act(() => {
    //         const holderElement: Element = container.querySelector(".ref-holder");
    //         holderElement.dispatchEvent(new Event("scroll", { bubbles: true }));
    //     });
    // });
});
