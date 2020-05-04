import React from "react";
import { act, Simulate, SyntheticEventData } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Carousel, defaultTransitionDuration } from "./Carousel";
import { CarouselItemProps, CarouselItem } from "./CarouselItem";

describe("Component: Carousel", () => {
    let container: HTMLDivElement = null;
    const carouselList: Array<CarouselItemProps> = [{ children: <div>test</div> }, { children: <div>test</div> }];
    jest.useFakeTimers();

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        jest.clearAllTimers();
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Should render", () => {
        act(() => {
            render(<Carousel />, container);
        });
        act(() => jest.runOnlyPendingTimers());
        expect(container.firstElementChild).not.toBeNull();
    });

    it("Should render with a list, children, or both", () => {
        act(() => {
            render(<Carousel list={carouselList} />, container);
        });
        act(() => jest.runOnlyPendingTimers());
        expect(container.querySelectorAll(".carousel-item")).toHaveLength(carouselList.length);

        act(() => {
            render(
                <Carousel>
                    <CarouselItem>test</CarouselItem>
                    <CarouselItem>test</CarouselItem>
                </Carousel>,
                container
            );
        });
        act(() => jest.runOnlyPendingTimers());
        expect(container.querySelectorAll(".carousel-item")).toHaveLength(2);

        act(() => {
            render(
                <Carousel list={carouselList}>
                    <CarouselItem>test</CarouselItem>
                    <CarouselItem>test</CarouselItem>
                    test
                </Carousel>,
                container
            );
        });
        act(() => jest.runOnlyPendingTimers());
        expect(container.querySelectorAll(".carousel-item")).toHaveLength(2 + carouselList.length);
    });

    it("Should render indicators when enabled", () => {
        act(() => {
            render(<Carousel list={carouselList} showIndicators />, container);
        });
        act(() => jest.runOnlyPendingTimers());
        expect(container.querySelector(".carousel-indicators")).not.toBeNull();
    });

    it("Should trigger carousel items and allow custom duration", () => {
        const transitionDuration: number = 10000;
        const afterChange: jest.Mock = jest.fn();
        act(() => {
            render(
                <Carousel transitionDuration={transitionDuration} afterChange={afterChange} list={carouselList}>
                    <CarouselItem>test</CarouselItem>
                    <CarouselItem>test</CarouselItem>
                    test
                </Carousel>,
                container
            );
        });
        act(() => jest.runOnlyPendingTimers());

        expect(container.querySelectorAll(".carousel-item").item(0).classList.contains("active")).toBeTruthy();
        expect(container.querySelectorAll(".carousel-item").item(1).classList.contains("active")).toBeFalsy();

        act(() => Simulate.click(container.querySelector(".carousel-control-next")));
        act(() => jest.advanceTimersToNextTimer(transitionDuration));
        expect(afterChange).toBeCalled();
        expect(container.querySelectorAll(".carousel-item").item(0).classList.contains("active")).toBeFalsy();
        expect(container.querySelectorAll(".carousel-item").item(1).classList.contains("active")).toBeTruthy();
    });

    it("Should navigate between slides using nav clicks and keyboard arrows", () => {
        const afterChange: jest.Mock = jest.fn();
        act(() => {
            render(<Carousel showIndicators afterChange={afterChange} list={carouselList} />, container);
        });
        act(() => jest.runOnlyPendingTimers());

        function testTwice(selector: string, type: "click" | "keyUp", options: SyntheticEventData = {}): void {
            act(() => Simulate[type](container.querySelector(selector), options));
            act(() => jest.advanceTimersToNextTimer());
            act(() => Simulate[type](container.querySelector(selector), options));
            act(() => jest.advanceTimersToNextTimer());
        }

        // Click next
        testTwice(".carousel-control-next", "click");

        // Click prev
        testTwice(".carousel-control-prev", "click");

        // Right arrow key
        testTwice(".carousel-control-prev", "keyUp", { key: "arrowright" });

        // Left arrow key
        testTwice(".carousel-control-prev", "keyUp", { key: "arrowleft" });

        // Space arrow key
        testTwice(".carousel-control-prev", "keyUp", { key: " " });
        testTwice(".carousel-control-prev", "keyUp", { key: "space" });

        // Indicator clicked
        testTwice(".carousel-indicators > li:not(.active)", "click");

        // 12 test cases plus initial afterChange when component loads
        expect(afterChange).toBeCalledTimes(15);
    });

    it("Should not allow looping when infinite is disabled", () => {
        const afterChange: jest.Mock = jest.fn();
        act(() => {
            render(<Carousel infinite={false} afterChange={afterChange} list={carouselList} />, container);
        });
        act(() => jest.runOnlyPendingTimers());

        afterChange.mockReset();
        act(() => Simulate.click(container.querySelector(".carousel-control-next")));
        act(() => jest.advanceTimersToNextTimer());
        act(() => Simulate.click(container.querySelector(".carousel-control-next")));
        act(() => jest.advanceTimersToNextTimer());
        expect(afterChange).toBeCalledTimes(1);

        afterChange.mockReset();
        act(() => Simulate.click(container.querySelector(".carousel-control-prev")));
        act(() => jest.advanceTimersToNextTimer());
        act(() => Simulate.click(container.querySelector(".carousel-control-prev")));
        act(() => jest.advanceTimersToNextTimer());
        expect(afterChange).toBeCalledTimes(1);
    });

    it("Should not allow navigating when transition is occuring", () => {
        const afterChange: jest.Mock = jest.fn();
        act(() => {
            render(<Carousel infinite={false} afterChange={afterChange} list={carouselList} />, container);
        });
        act(() => jest.runOnlyPendingTimers());

        afterChange.mockReset();
        act(() => Simulate.click(container.querySelector(".carousel-control-next")));
        act(() => Simulate.click(container.querySelector(".carousel-control-next")));
        act(() => jest.advanceTimersToNextTimer());
        expect(afterChange).toBeCalledTimes(1);
    });
});
