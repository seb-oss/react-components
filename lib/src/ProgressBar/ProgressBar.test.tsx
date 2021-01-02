import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { ProgressBar } from ".";
import { act } from "react-dom/test-utils";

describe("Component: ProgressBar", () => {
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
            render(<ProgressBar />, container);
        });
        expect(container).toBeDefined();
    });
});
