import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { TabItem } from "./TabItem";
import { act } from "react-dom/test-utils";

describe("Component: TabItem", () => {
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
        const content: string = "my content";

        act(() => {
            render(<TabItem>{content}</TabItem>, container);
        });

        expect(container).toBeDefined();
        expect(container.firstElementChild.tagName.toLowerCase()).toEqual("li");
        expect(container.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("nav-item")).toBeTruthy();
        expect(container.firstElementChild.firstElementChild.textContent).toEqual(content);
        expect(container.firstElementChild.firstElementChild.getAttribute("href").endsWith("#")).toBeTruthy();
    });

    it("Should allow passing a custom classname", () => {
        const className: string = "myClassname";
        const wrapperClassName: string = "myWrapperClassname";

        act(() => {
            render(<TabItem className={className} wrapperProps={{ className: wrapperClassName }} />, container);
        });

        expect(container.firstElementChild.classList.contains(wrapperClassName)).toBeTruthy();
        expect(container.firstElementChild.firstElementChild.classList.contains(className)).toBeTruthy();
    });

    it("Should reflect active an desabled states", () => {
        act(() => {
            render(<TabItem active disabled />, container);
        });

        expect(container.firstElementChild.firstElementChild.classList.contains("active")).toBeTruthy();
        expect(container.firstElementChild.firstElementChild.classList.contains("disabled")).toBeTruthy();
    });
});
