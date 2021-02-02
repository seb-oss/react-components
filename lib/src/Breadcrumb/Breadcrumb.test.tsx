import React from "react";
import { Breadcrumb } from ".";
import { BreadcrumbItem } from "../BreadcrumbItem";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

describe("Component: Breadcrumb", () => {
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
            render(<Breadcrumb />, container);
        });
        expect(container.firstElementChild.tagName).toEqual("NAV");
        expect(container.firstElementChild.getAttribute("aria-label")).toEqual("breadcrumb");
        expect(container.firstElementChild.firstElementChild.tagName).toEqual("OL");
        expect(container.firstElementChild.firstElementChild.classList.contains("breadcrumb")).toBeTruthy();
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

    it("Should allow rendering none elements", () => {
        const text: string = "Some text";
        act(() => {
            render(<Breadcrumb>{text}</Breadcrumb>, container);
        });
        expect(container.firstElementChild.firstElementChild.innerHTML).toEqual(text);
    });
});
