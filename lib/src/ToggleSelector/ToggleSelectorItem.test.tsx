import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { ToggleSelectorItem } from "./ToggleSelectorItem";

describe("Component: ToggleSelectorItem", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        jest.clearAllMocks();
    });

    it("Should render simple toggle selector", () => {
        act(() => {
            render(<ToggleSelectorItem />, container);
        });

        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("toggle-selector-item")).toBeTruthy();
        expect(container.querySelector("input")).not.toBeNull();
        expect(container.querySelector("label")).not.toBeNull();
        expect(container.querySelector("input").id).not.toBe("");
        expect(container.querySelector("label").getAttribute("for")).not.toBe("");
    });

    it("Should allow passing a custom id", () => {
        const id: string = "myId";

        act(() => {
            render(<ToggleSelectorItem id={id} />, container);
        });

        expect(container.querySelector("input").id).toEqual(id);
        expect(container.querySelector("label").getAttribute("for")).toEqual(id);
    });

    it("Should render children correctly", () => {
        const content: string = "My content";

        act(() => {
            render(<ToggleSelectorItem>{content}</ToggleSelectorItem>, container);
        });

        expect(container.querySelector("label").textContent).toEqual(content);
    });
});
