import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Tabs } from ".";
import { act } from "react-dom/test-utils";

describe("Component: Tabs", () => {
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
            render(<Tabs />, container);
        });
        expect(container).toBeDefined();
    });
});
