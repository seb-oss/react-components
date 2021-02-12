import React from "react";
import { NumberedPagination } from ".";
import { act } from "react-dom/test-utils";
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
            render(<NumberedPagination end={10} />, container);
        });

        expect(container).toBeDefined();

        const ul: HTMLUListElement = container.querySelector<HTMLUListElement>("ul");
        // 5 pages + 2 navigations (next + prev) + 1 ellipsis
        expect(ul.children.length).toEqual(8);
    });

    it("Should render anchor tags with correct tag when href mask is passed", () => {
        act(() => {
            render(<NumberedPagination end={3} hrefMask="/pages/$i" />, container);
        });

        const listItems: NodeListOf<HTMLLIElement> = container.querySelectorAll<HTMLLIElement>("li");

        expect(listItems.length).toBe(5);
        expect(listItems.item(1).firstElementChild.getAttribute("href")).toEqual("/pages/1");
        expect(listItems.item(2).firstElementChild.getAttribute("href")).toEqual("/pages/2");
        expect(listItems.item(3).firstElementChild.getAttribute("href")).toEqual("/pages/3");
    });
});
