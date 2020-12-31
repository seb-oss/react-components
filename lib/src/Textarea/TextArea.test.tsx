import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Textarea } from ".";
import { act } from "react-dom/test-utils";

describe("Component: Textarea", () => {
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

    it("Should render", () => {
        act(() => {
            render(<Textarea />, container);
        });
        expect(container).toBeDefined();
    });
});
