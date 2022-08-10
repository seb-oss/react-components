import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { CloseButton } from ".";
import { act } from "react-dom/test-utils";

describe("Component: CloseButton", () => {
    let container: HTMLDivElement = null;

    beforeEach(() => {
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
            render(<CloseButton />, container);
        });

        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("button");
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("close-btn")).toBeTruthy();
    });

    it("Should allow passing a custom classname", () => {
        const className: string = "myClassName";

        act(() => {
            render(<CloseButton className={className} />, container);
        });

        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });
});
