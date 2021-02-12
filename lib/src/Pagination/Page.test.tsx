import React from "react";
import { Page } from "./Page";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";

describe("Component: Pagination page", () => {
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
        act(() => {
            render(<Page />, container);
        });

        expect(container).toBeDefined();
        const li: HTMLLIElement = container.firstElementChild as any;
        const a: HTMLAnchorElement = container.firstElementChild.firstElementChild as any;
        expect(li).not.toBeNull();
        expect(a).not.toBeNull();
        expect(li.tagName.toLowerCase()).toEqual("li");
        expect(li.classList.contains("page-item")).toBeTruthy();
        expect(a.tagName.toLowerCase()).toEqual("a");
        expect(a.classList.contains("page-link")).toBeTruthy();
        expect(a.href).toContain("#");
    });

    it("Should render with active, disabled, href and custom classname", () => {
        const className: string = "mycustomclass";
        const href: string = "my/href/1";

        act(() => {
            render(<Page data-active data-disabled className={className} href={href} />, container);
        });

        const li: HTMLLIElement = container.firstElementChild as any;
        const a: HTMLAnchorElement = container.firstElementChild.firstElementChild as any;
        expect(li.classList.contains("page-item")).toBeTruthy();
        expect(li.classList.contains(className)).toBeTruthy();
        expect(li.classList.contains("active")).toBeTruthy();
        expect(li.classList.contains("disabled")).toBeTruthy();
        expect(a.href).toContain(href);
        expect(a.getAttribute("aria-disabled")).toEqual("true");
        Simulate.click(a);
    });
});
