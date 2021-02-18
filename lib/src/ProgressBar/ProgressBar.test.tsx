import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { ProgressBar } from ".";
import { act } from "react-dom/test-utils";
import { ProgressBarProps } from "./ProgressBar";

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
        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("progress");
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("progress-bar")).toBeTruthy();
    });

    it("Should allow passing a custom classname", () => {
        const className: string = "myclassname";

        act(() => {
            render(<ProgressBar className={className} />, container);
        });

        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    describe("Supported themes", () => {
        const themse: ProgressBarProps["theme"][] = ["purple", "primary", "danger", "success", "warning", "inverted"];

        themse.forEach((theme) =>
            test(theme, () => {
                act(() => {
                    render(<ProgressBar theme={theme} />, container);
                });

                expect(container.firstElementChild.classList.contains(`theme-${theme}`)).toBeTruthy();
            })
        );
    });
});
