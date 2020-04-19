import React from "react";
import { Breadcrumb } from "./Breadcrumb";
import { BreadcrumbItem, BreadcrumbItemProps } from "./BreadcrumbItem";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

describe("Component: Breadcrumb", () => {
    let container: HTMLDivElement = null;
    const breadcrumbList1: Array<BreadcrumbItemProps> = [{ children: "First" }, { children: "Second" }, { children: "Third" }];

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
            render(<Breadcrumb />, container);
        });
        expect(container.firstElementChild.tagName).toEqual("NAV");
        expect(container.firstElementChild.getAttribute("aria-label")).toEqual("breadcrumb");
        expect(container.firstElementChild.firstElementChild.tagName).toEqual("OL");
        expect(container.firstElementChild.firstElementChild.classList.contains("seb")).toBeTruthy();
        expect(container.firstElementChild.firstElementChild.classList.contains("breadcrumb")).toBeTruthy();
    });

    it("Should render with a list with data-value", () => {
        act(() => {
            render(<Breadcrumb list={breadcrumbList1} />, container);
        });
        expect(container.firstElementChild.firstElementChild.children.length).toEqual(breadcrumbList1.length);
        expect(container.firstElementChild.firstElementChild.firstElementChild.tagName).toEqual("LI");
        expect(container.firstElementChild.firstElementChild.firstElementChild.firstElementChild.tagName).toEqual("A");
        expect(container.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute("data-value")).toEqual("0");
    });

    it("Should render BreadcrumbItem directly", () => {
        act(() => {
            render(
                <Breadcrumb>
                    <BreadcrumbItem>First</BreadcrumbItem>
                    <BreadcrumbItem>Second</BreadcrumbItem>
                </Breadcrumb>,
                container
            );
        });
        const items: NodeListOf<HTMLLIElement> = container.querySelectorAll(".breadcrumb-item");
        expect(items.length).toBe(2);
        expect(items[0].firstElementChild.innerHTML).toEqual("First");
        expect(items[1].firstElementChild.innerHTML).toEqual("Second");
    });

    it("Should pass onNavigate to all items in the list", () => {
        const onNavigate: jest.Mock = jest.fn();
        act(() => {
            render(<Breadcrumb list={breadcrumbList1} onNavigate={onNavigate} />, container);
        });
        act(() => {
            const items: NodeListOf<HTMLLIElement> = container.querySelectorAll(".breadcrumb-item");
            items[0].firstElementChild.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            items[1].firstElementChild.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            items[2].firstElementChild.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(onNavigate).toBeCalledTimes(2);
    });
});
