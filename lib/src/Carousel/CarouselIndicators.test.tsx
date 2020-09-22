import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { CarouselIndicators } from "./CarouselIndicators";
import { randomId } from "@sebgroup/frontend-tools";

describe("Component: Carousel", () => {
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
            render(<CarouselIndicators />, container);
        });
        expect(container.firstElementChild).not.toBeNull();
        expect(container.firstElementChild.classList.contains("carousel-indicators")).toBeTruthy();
    });

    it("Should render elements correctly with parent id on each element", () => {
        const active: number = 1;
        const size: number = 3;
        const parentId: string = randomId("test-");
        const onIndicatorClicked: jest.Mock = jest.fn();
        act(() => {
            render(<CarouselIndicators active={active} size={size} parentId={parentId} onIndicatorClicked={onIndicatorClicked} />, container);
        });
        const children: NodeListOf<HTMLLIElement> = container.querySelectorAll("li");
        expect(children.length).toBe(size);
        children.forEach((child: HTMLLIElement, index: number) => {
            expect(child.classList.contains("active")).toBe(index === active);
            expect(child.getAttribute("data-target")).toEqual(`#${parentId}`);
            expect(child.getAttribute("data-slide-to")).toEqual(index.toString());
        });
        children.item(active).click();
        children.item(0).click();
        expect(onIndicatorClicked).toBeCalledTimes(1);
    });
});
