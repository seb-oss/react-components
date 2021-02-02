import React from "react";
import { StepLabel } from "./StepLabel";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";

describe("Component: StepLabel", () => {
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

    it("Should render correctly", () => {
        const label: string = "label";
        act(() => {
            render(<StepLabel label={label} />, container);
        });

        expect(container.querySelector(".text")).not.toBeNull();
    });

    it("Should render as active if isActive = true", () => {
        const label: string = "label";
        act(() => {
            render(<StepLabel label={label} isActive />, container);
        });

        expect(container.querySelector(".active")).not.toBeNull();
    });
});
