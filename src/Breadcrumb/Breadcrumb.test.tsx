import React from "react";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

describe("Component: Breadcrumb", () => {
    let container: HTMLDivElement = null;
    const breadcrumbList1: Array<BreadcrumbItem> = [{ text: "First" }, { text: "Second" }, { text: "Third" }];
    const breadcrumbList2: Array<BreadcrumbItem> = [
        { text: "First", title: "First", href: "First" },
        { text: "Second", title: "Second", href: "Second" },
    ];

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render custom className and id", () => {
        const className: string = "myBreadcrumbClass";
        const id: string = "myBreadcrubID";
        act(() => {
            render(<Breadcrumb list={breadcrumbList1} className={className} id={id} />, container);
        });
        expect(container.querySelector(".seb.breadcrumb").children.length).toEqual(breadcrumbList1.length);
        expect(container.firstElementChild.classList.contains(className)).toBeTruthy();
        expect(container.firstElementChild.id).toEqual(id);
    });

    it("Should fire click event when clicked", () => {
        const onClick: jest.Mock = jest.fn();
        act(() => {
            render(<Breadcrumb list={breadcrumbList1} onClick={onClick} />, container);
        });
        container
            .querySelectorAll(".breadcrumb-item")
            .item(0)
            .firstElementChild.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        expect(onClick).toBeCalled();
    });

    it("Should render with href, data-value, title, aria-label, and aria-current", () => {
        act(() => {
            render(<Breadcrumb list={breadcrumbList2} />, container);
        });
        const items: NodeListOf<HTMLLIElement> = container.querySelectorAll(".breadcrumb-item");
        expect(container.firstElementChild.getAttribute("aria-label")).toEqual("breadcrumb");
        // First element
        expect(items.item(0).hasAttribute("aria-current")).toBeFalsy();
        expect(items.item(0).firstElementChild.getAttribute("title")).toEqual(breadcrumbList2[0].title);
        expect(items.item(0).firstElementChild.getAttribute("href")).toEqual(breadcrumbList2[0].href);
        expect(items.item(0).firstElementChild.getAttribute("data-value")).toEqual("0");
        expect(items.item(0).firstElementChild.innerHTML).toEqual(breadcrumbList2[0].text);
        // Last element
        expect(items.item(1).hasAttribute("aria-current")).toBeTruthy();
        expect(items.item(1).getAttribute("aria-current")).toEqual("page");
        expect(items.item(1).firstElementChild.getAttribute("title")).toEqual(breadcrumbList2[1].title);
        expect(items.item(1).firstElementChild.getAttribute("href")).toBeNull();
        expect(items.item(1).firstElementChild.getAttribute("data-value")).toEqual("1");
        expect(items.item(1).firstElementChild.innerHTML).toEqual(breadcrumbList2[1].text);
    });

    it("Should render ReactNode", () => {
        act(() => {
            render(<Breadcrumb list={[{ text: <svg id="mySvg" /> }]} />, container);
        });
        expect(container.querySelectorAll("#mySvg").length).toBe(1);
    });
});
