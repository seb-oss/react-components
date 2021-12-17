import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { Chip } from ".";

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

    it("Should trigger onClose callback when close button is clicked", () => {
        act(() => {
            render(<Chip onClose={onClose}>Test</Chip>, container);
        });
        act(() => Simulate.click(container.querySelector("button")));
        expect(onClose).toHaveBeenCalled();
    });

    describe("Keyboard support", () => {
        function renderChip(): void {
            act(() => render(<Chip onClose={onClose}>Chip</Chip>, container));
            container.querySelector<HTMLButtonElement>(".chip").focus();
        }

        function pressKey(key: string): void {
            act(() => Simulate.keyDown(document.activeElement, { key }));
        }

        it("Should trigger onClose when Backspace button is pressed", () => {
            renderChip();
            expect(onClose).not.toHaveBeenCalled();
            pressKey("Backspace");
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        it("Should trigger onClose when Delete button is pressed", () => {
            renderChip();
            expect(onClose).not.toHaveBeenCalled();
            pressKey("Delete");
            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });
});
