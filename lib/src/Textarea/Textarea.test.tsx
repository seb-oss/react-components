import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Textarea, TextareaProps } from ".";
import { act } from "react-dom/test-utils";

describe("Component: Textarea", () => {
    let container: HTMLDivElement = null;
    const renderComponent = (props: TextareaProps = {}) => {
        act(() => {
            render(<Textarea {...props} />, container);
        });
    };

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
        renderComponent();
        expect(container).toBeDefined();
    });

    it("Should render with label", () => {
        const label: string = "element label";
        renderComponent({ label });
        expect(container.querySelector("label").textContent).toBe(label);
    });

    it("Should render with custom id", () => {
        const id: string = "custom id";
        renderComponent({ id });
        expect(container.querySelector("textarea").id).toBe(id);
    });
});
