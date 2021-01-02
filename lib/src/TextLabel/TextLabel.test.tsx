import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { TextLabel } from ".";
import { act } from "react-dom/test-utils";

describe("Component: TextLable", () => {
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
            render(<TextLabel value="test" />, container);
        });
        expect(container).toBeDefined();
    });
});
