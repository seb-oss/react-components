import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { CarouselItem } from "./CarouselItem";
import { Carousel, defaultTransitionDuration } from "./Carousel";

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
            render(<CarouselItem />, container);
        });
        expect(container.firstElementChild).toBeDefined();
        expect(container.firstElementChild.classList.contains("carousel-item")).toBeTruthy();
    });

    it("Should transition correctly and call afterTransition", () => {
        const afterTransition: jest.Mock = jest.fn();
        act(() => {
            jest.useFakeTimers();
            render(<CarouselItem nav="next" defaultChecked afterTransition={afterTransition} />, container);
        });
        expect(container.firstElementChild.classList.contains("carousel-item-next")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("carousel-item-left")).toBeTruthy();
        expect(container.firstElementChild.classList.contains("active")).toBeFalsy();
        act(() => {
            jest.advanceTimersByTime(defaultTransitionDuration);
        });
        expect(container.firstElementChild.classList.contains("active")).toBeTruthy();
    });
});

const Testbed: React.FC = () => {
    return (
        <Carousel>
            <CarouselItem>First</CarouselItem>
            <CarouselItem>Second</CarouselItem>
        </Carousel>
    );
};
