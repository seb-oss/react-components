import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Chip } from ".";
import { act, Simulate } from "react-dom/test-utils";

describe("Component: Chip", () => {
    let container: HTMLDivElement = null;
    let onClose: (e: React.MouseEvent<HTMLDivElement>) => void;

    beforeEach(() => {
        onClose = jest.fn();
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
            render(<Chip onClose={onClose}>Test</Chip>, container);
        });
        expect(container).not.toBeNull();
        expect(container.querySelector(".content").textContent).toEqual("Test");
    });

    it("Should trigger onClose callback when clicked", () => {
        act(() => {
            render(<Chip onClose={onClose}>Test</Chip>, container);
        });
        act(() => Simulate.click(container.querySelector(".chip-close")));
        expect(onClose).toHaveBeenCalled();
    });
});
