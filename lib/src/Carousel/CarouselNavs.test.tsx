import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { CarouselNavs, CarouselNavsProps } from "./CarouselNavs";
import { randomId } from "@sebgroup/frontend-tools/randomId";

describe("Component: Carousel", () => {
    let container: HTMLDivElement = null;
    const props: CarouselNavsProps = {
        onNavigate: jest.fn(),
        parentId: randomId("nav-"),
    };

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
            render(<CarouselNavs {...props} />, container);
        });
        expect(container.firstElementChild.classList.contains("carousel-control-prev")).toBeTruthy();
        expect(container.lastElementChild.classList.contains("carousel-control-next")).toBeTruthy();

        expect(container.firstElementChild.getAttribute("href")).toEqual(`#${props.parentId}`);
        expect(container.lastElementChild.getAttribute("href")).toEqual(`#${props.parentId}`);

        expect(container.firstElementChild.lastElementChild.innerHTML).toEqual("Previous");
        expect(container.lastElementChild.lastElementChild.innerHTML).toEqual("Next");

        act(() => Simulate.click(container.firstElementChild));
        act(() => Simulate.keyUp(container.firstElementChild));
        act(() => Simulate.click(container.lastElementChild));
        act(() => Simulate.keyUp(container.lastElementChild));
        expect(props.onNavigate).toBeCalledTimes(4);
    });

    it("Should render custom sr-only text", () => {
        const previousText: string = "prevTest";
        const nextText: string = "nextTest";

        act(() => {
            render(<CarouselNavs {...props} previousText={previousText} nextText={nextText} />, container);
        });

        expect(container.firstElementChild.lastElementChild.innerHTML).toEqual(previousText);
        expect(container.lastElementChild.lastElementChild.innerHTML).toEqual(nextText);
    });
});
