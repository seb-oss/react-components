import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Chip } from ".";
import { act, Simulate } from "react-dom/test-utils";

describe("Component: Chip", () => {
    let container: HTMLDivElement = null;
    let onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;

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

    it("Should render correction", () => {
        act(() => {
            render(<Chip onClose={onClose}>Test</Chip>, container);
        });
        expect(container).toBeDefined();
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("chip")).toBeTruthy();
        expect(container.firstElementChild.firstElementChild.classList.contains("content")).toBeTruthy();
        expect(container.firstElementChild.lastElementChild.tagName.toLowerCase()).toEqual("button");
        expect(container.querySelector(".content").textContent).toEqual("Test");
    });

    it("Should trigger onClose callback when clicked", () => {
        act(() => {
            render(<Chip onClose={onClose}>Test</Chip>, container);
        });
        act(() => Simulate.click(container.querySelector("button")));
        expect(onClose).toHaveBeenCalled();
    });
});
