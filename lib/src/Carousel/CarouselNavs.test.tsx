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
        const prevButton: HTMLElement = container.querySelector(".carousel-control-prev");
        const nextButton: HTMLElement = container.querySelector(".carousel-control-next");

        expect(prevButton).toBeDefined();
        expect(nextButton).toBeDefined();

        expect(prevButton.getAttribute("href")).toEqual(`#${props.parentId}`);
        expect(nextButton.getAttribute("href")).toEqual(`#${props.parentId}`);

        expect(prevButton.querySelector(".sr-only").innerHTML).toEqual("Previous");
        expect(nextButton.querySelector(".sr-only").innerHTML).toEqual("Next");

        act(() => Simulate.click(prevButton));
        act(() => Simulate.keyUp(prevButton));
        act(() => Simulate.click(nextButton));
        act(() => Simulate.keyUp(nextButton));
        expect(props.onNavigate).toBeCalledTimes(4);
    });

    it("Should render custom sr-only text", () => {
        const previousText: string = "prevTest";
        const nextText: string = "nextTest";

        act(() => {
            render(<CarouselNavs {...props} previousText={previousText} nextText={nextText} />, container);
        });

        expect(container.querySelector(".carousel-control-prev .sr-only").innerHTML).toEqual(previousText);
        expect(container.querySelector(".carousel-control-next .sr-only").innerHTML).toEqual(nextText);
    });
});
