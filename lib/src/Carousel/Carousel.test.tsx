import React from "react";
import { act, Simulate, SyntheticEventData } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { Carousel } from ".";

type EventType = keyof HTMLElementEventMap;
type Listener = EventListener;

describe("Component: Carousel", () => {
    let container: HTMLDivElement = null;

    const events: Map<EventType, Listener> = new Map<EventType, Listener>();
    document.body.addEventListener = jest.fn((type: EventType, listener: Listener) => {
        events.set(type, listener);
    });
    document.body.removeEventListener = jest.fn((type: EventType, listener: Listener) => {
        events.delete(type);
    });

    function element(i: number): HTMLDivElement {
        return container.querySelectorAll<HTMLDivElement>(".carousel-item").item(i);
    }

    function simulateTimes(times: number, selector: string, type: "click" | "keyUp", options: SyntheticEventData = {}): void {
        [...Array(times)].map(() => {
            act(() => Simulate[type](container.querySelector(selector), options));
            act(() => Simulate.transitionEnd(element(0)));
            act(() => Simulate.animationEnd(element(1)));
        });
    }
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
            render(<Carousel />, container);
        });
        expect(container.firstElementChild).not.toBeNull();
    });

    it("Should render with a list, children, or both", () => {
        act(() => {
            render(
                <Carousel>
                    <Carousel.Item>First</Carousel.Item>
                    <Carousel.Item>Second</Carousel.Item>
                </Carousel>,
                container
            );
        });
        expect(container.querySelectorAll(".carousel-item")).toHaveLength(2);
    });

    it("Should render indicators when enabled", () => {
        act(() => {
            render(
                <Carousel showIndicators>
                    <Carousel.Item>test</Carousel.Item>
                    <Carousel.Item>test</Carousel.Item>
                </Carousel>,
                container
            );
        });
        expect(container.querySelector(".carousel-indicators")).not.toBeNull();
    });

    it("Should trigger carousel items and allow custom duration", () => {
        const transitionDuration: number = 10000;
        const afterChange: jest.Mock = jest.fn();
        act(() => {
            render(
                <Carousel transitionDuration={transitionDuration} afterChange={afterChange}>
                    <Carousel.Item>test</Carousel.Item>
                    <Carousel.Item>test</Carousel.Item>
                    test
                </Carousel>,
                container
            );
        });

        act(() => Simulate.click(container.querySelector(".carousel-control-next")));
        act(() => Simulate.transitionEnd(element(0)));
        act(() => Simulate.animationEnd(element(1)));
        expect(afterChange).toBeCalledTimes(1);
    });

    it("Should navigate between slides using nav clicks and keyboard arrows", () => {
        const afterChange: jest.Mock = jest.fn();
        act(() => {
            render(
                <Carousel showIndicators afterChange={afterChange}>
                    <Carousel.Item>First</Carousel.Item>
                    <Carousel.Item>Second</Carousel.Item>
                </Carousel>,
                container
            );
        });

        // Click next
        simulateTimes(2, ".carousel-control-next", "click");

        // Click prev
        simulateTimes(2, ".carousel-control-prev", "click");

        // Right arrow key
        simulateTimes(2, ".carousel-control-prev", "keyUp", { key: "arrowright" });

        // Left arrow key
        simulateTimes(2, ".carousel-control-prev", "keyUp", { key: "arrowleft" });

        // Space arrow key
        simulateTimes(2, ".carousel-control-prev", "keyUp", { key: " " });
        simulateTimes(2, ".carousel-control-prev", "keyUp", { key: "space" });

        // Indicator clicked
        simulateTimes(2, ".carousel-indicators > li:not(.active)", "click");

        expect(afterChange).toBeCalledTimes(14);
    });

    it("Should not allow looping when infinite is disabled", () => {
        act(() => {
            render(
                <Carousel infinite={false}>
                    <Carousel.Item>First</Carousel.Item>
                    <Carousel.Item>Second</Carousel.Item>
                </Carousel>,
                container
            );
        });

        simulateTimes(2, ".carousel-control-next", "click");
        expect(container.querySelectorAll(".carousel-item").item(1).classList.contains("active")).toBeTruthy();

        simulateTimes(2, ".carousel-control-prev", "click");
        expect(container.querySelectorAll(".carousel-item").item(0).classList.contains("active")).toBeTruthy();
    });

    it("Should not allow navigating when transition is occuring", () => {
        const afterChange: jest.Mock = jest.fn();
        act(() => {
            render(
                <Carousel infinite={false} afterChange={afterChange}>
                    <Carousel.Item>First</Carousel.Item>
                    <Carousel.Item>Second</Carousel.Item>
                </Carousel>,
                container
            );
        });

        afterChange.mockReset();
        simulateTimes(1, ".carousel-control-next", "click");
        expect(afterChange).toBeCalledTimes(1);
    });

    it("Should render with fade style", () => {
        act(() => {
            render(
                <Carousel transitionStyle="fade">
                    <Carousel.Item>First</Carousel.Item>
                    <Carousel.Item>Second</Carousel.Item>
                </Carousel>,
                container
            );
        });
        expect(container.firstElementChild.classList.contains("carousel-fade")).toBeTruthy();
    });

    describe("Should allow swiping with mouse and touch", () => {
        const totalWidth: number = 1000;
        const swipeDistance: number = totalWidth / 4 + 1;

        test("Mouse", () => {
            const onMouseDown: jest.Mock = jest.fn();

            act(() => {
                render(
                    <Carousel onMouseDown={onMouseDown}>
                        <Carousel.Item>First</Carousel.Item>
                        <Carousel.Item>Second</Carousel.Item>
                    </Carousel>,
                    container
                );
            });
            jest.spyOn(container.firstElementChild, "clientWidth", "get").mockImplementation(() => totalWidth);

            expect(container.querySelector(".carousel-item").classList.contains("active")).toBeTruthy();

            // Mouse swipe
            act(() => Simulate.mouseDown(container.firstElementChild, { clientX: 0 }));
            expect(events.has("mousemove")).toBeTruthy();

            // Any distance below he swipe triggering distance should be ignored
            act(() => events.get("mousemove")(new MouseEvent("mousemove", { clientX: 10 })));
            act(() => events.get("mouseup")(new MouseEvent("mouseup")));
            expect(container.querySelectorAll(".carousel-item").item(0).classList.contains("carousel-item-right")).toBeFalsy();

            act(() => Simulate.mouseDown(container.firstElementChild, { clientX: 0 }));
            act(() => events.get("mousemove")(new MouseEvent("mousemove", { clientX: swipeDistance })));
            expect(container.querySelector(".carousel-item.active").getAttribute("style")).toContain(`transform: translate3d(${swipeDistance}px, 0, 0);`);
            act(() => events.get("mouseup")(new MouseEvent("mouseup")));
            expect(events.has("mousemove")).toBeFalsy();
            expect(container.querySelectorAll(".carousel-item").item(0).classList.contains("carousel-item-right")).toBeTruthy();
            expect(onMouseDown).toBeCalled();
        });

        test("Touch", () => {
            const onTouchStart: jest.Mock = jest.fn();

            act(() => {
                render(
                    <Carousel onTouchStart={onTouchStart}>
                        <Carousel.Item>First</Carousel.Item>
                        <Carousel.Item>Second</Carousel.Item>
                    </Carousel>,
                    container
                );
            });

            // Touch swipe
            act(() => Simulate.touchStart(container.firstElementChild, { cancelable: true, touches: { item: () => ({ clientX: 0 }) } as any }));
            expect(events.has("touchmove")).toBeTruthy();
            const ev: TouchEvent = document.createEvent("TouchEvent");
            ev.initEvent("touchmove", true);

            // It shouldn't change when clientX is undefined
            jest.spyOn(ev, "touches", "get").mockImplementation(() => ({ item: () => ({ clientX: undefined }) } as any));
            act(() => events.get("touchmove")(ev));
            expect(container.querySelector(".carousel-item.active").getAttribute("style")).not.toContain(`transform: translate3d(${-swipeDistance}px, 0, 0);`);

            // It should change when clientX is defined
            jest.spyOn(ev, "touches", "get").mockImplementation(() => ({ item: () => ({ clientX: -swipeDistance }) } as any));
            act(() => events.get("touchmove")(ev));
            expect(container.querySelector(".carousel-item.active").getAttribute("style")).toContain(`transform: translate3d(${-swipeDistance}px, 0, 0);`);
            act(() => events.get("touchend")(new TouchEvent("touchend")));
            expect(events.has("touchmove")).toBeFalsy();
            expect(container.querySelectorAll(".carousel-item").item(0).classList.contains("carousel-item-left")).toBeTruthy();
            expect(onTouchStart).toBeCalled();
        });
    });

    it("Should allow autoplay", () => {
        act(() => {
            jest.useFakeTimers();
            render(
                <Carousel autoplay>
                    <Carousel.Item>First</Carousel.Item>
                    <Carousel.Item>Second</Carousel.Item>
                </Carousel>,
                container
            );
        });
        act(() => jest.advanceTimersToNextTimer());
        expect(element(0).classList.contains("carousel-item-left")).toBeTruthy();
        act(() => Simulate.transitionEnd(element(0)));
        act(() => Simulate.animationEnd(element(1)));
        expect(element(1).classList.contains("active")).toBeTruthy();

        jest.clearAllTimers();
    });

    it("Should be interrupted on hover", () => {
        const onMouseEnter: jest.Mock = jest.fn();
        const onMouseLeave: jest.Mock = jest.fn();

        act(() => {
            jest.useFakeTimers();
            render(
                <Carousel onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} autoplay>
                    <Carousel.Item>First</Carousel.Item>
                    <Carousel.Item>Second</Carousel.Item>
                </Carousel>,
                container
            );
        });
        act(() => Simulate.mouseEnter(container.firstElementChild));
        act(() => jest.advanceTimersToNextTimer());
        expect(element(0).classList.contains("carousel-item-left")).toBeFalsy();

        act(() => Simulate.mouseLeave(container.firstElementChild));
        act(() => jest.advanceTimersByTime(1000));
        expect(element(0).classList.contains("carousel-item-left")).toBeFalsy();

        act(() => Simulate.mouseLeave(container.firstElementChild));
        act(() => jest.advanceTimersToNextTimer());
        expect(element(0).classList.contains("carousel-item-left")).toBeTruthy();

        expect(onMouseEnter).toBeCalled();
        expect(onMouseLeave).toBeCalled();

        jest.clearAllTimers();
    });

    it("Should allow passing custom autoplayspeed", () => {
        const autoplaySpeed: number = 9000;
        act(() => {
            jest.useFakeTimers();
            render(
                <Carousel autoplay autoplaySpeed={autoplaySpeed}>
                    <Carousel.Item>First</Carousel.Item>
                    <Carousel.Item>Second</Carousel.Item>
                </Carousel>,
                container
            );
        });

        act(() => jest.advanceTimersByTime(autoplaySpeed));
        expect(element(0).classList.contains("carousel-item-left")).toBeTruthy();

        jest.clearAllTimers();
    });
});
