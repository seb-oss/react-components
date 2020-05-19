import React from "react";
import { Breadcrumb } from "./Breadcrumb";
import { BreadcrumbItem, BreadcrumbItemProps } from "./BreadcrumbItem";
import { unmountComponentAtNode, render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";

describe("Component: Breadcrumb", () => {
    let container: HTMLDivElement = null;
    const breadcrumbList: Array<BreadcrumbItemProps> = [{ children: "First" }, { children: "Second" }, { children: "Third" }];

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
        expect(container.firstElementChild.firstElementChild.classList.contains("rc")).toBeTruthy();
        expect(container.firstElementChild.firstElementChild.classList.contains("breadcrumb")).toBeTruthy();
    });

    it("Should render with a list with data-index-number", () => {
        act(() => {
            render(<Breadcrumb list={breadcrumbList} />, container);
        });
        expect(container.firstElementChild.firstElementChild.children.length).toEqual(breadcrumbList.length);
        expect(container.firstElementChild.firstElementChild.firstElementChild.tagName).toEqual("LI");
        expect(container.firstElementChild.firstElementChild.firstElementChild.firstElementChild.tagName).toEqual("A");
        expect(container.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute("data-index-number")).toEqual("0");
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
            render(<Breadcrumb list={breadcrumbList} onNavigate={onNavigate} />, container);
        });
        act(() => {
            const items: NodeListOf<HTMLLIElement> = container.querySelectorAll(".breadcrumb-item");
            act(() => Simulate.click(items[0].firstElementChild));
            act(() => Simulate.click(items[1].firstElementChild));
            act(() => Simulate.click(items[items.length - 1].firstElementChild));
        });
        expect(onNavigate).toBeCalledTimes(2);
    });

    it("Should allow rendering none elements", () => {
        const text: string = "Some text";
        act(() => {
            render(<Breadcrumb>{text}</Breadcrumb>, container);
        });
        expect(container.firstElementChild.firstElementChild.innerHTML).toEqual(text);
    });

    it("Should set active to the last child even when rendering a list and children at the same time", () => {
        act(() => {
            render(
                <Breadcrumb list={breadcrumbList}>
                    <BreadcrumbItem>First</BreadcrumbItem>
                    <BreadcrumbItem>Second</BreadcrumbItem>
                </Breadcrumb>,
                container
            );
        });
        const elements: NodeListOf<HTMLLIElement> = container.querySelectorAll<HTMLLIElement>(".breadcrumb-item");
        elements.forEach((element: HTMLLIElement, i: number) => expect(element.classList.contains("active")).toBe(i === elements.length - 1));
    });

    it("Should allow passing a custom onNavigate", () => {
        const onToggle: jest.Mock = jest.fn();
        act(() => {
            render(<Breadcrumb onNavigate={onToggle} list={breadcrumbList} />, container);
        });
        act(() => {
            container.querySelector("a").click();
        });
        expect(onToggle).toBeCalled();
    });
});
