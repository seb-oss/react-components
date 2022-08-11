import { act, fireEvent, render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";
import React from "react";
import { Simulate } from "react-dom/test-utils";
import { Carousel, CarouselItem } from ".";
import { Key } from "../utils";

type EventType = keyof HTMLElementEventMap;
type Listener = EventListener;

describe("Component: Carousel", () => {
    function endMotions(): void {
        const [firstCarouselItem, secondCarouselItem]: Array<HTMLLIElement> = screen.getAllByRole("group");
        fireEvent.transitionEnd(firstCarouselItem);
        fireEvent.animationEnd(secondCarouselItem);
    }

    it("Should render", () => {
        render(<Carousel data-testid="carousel" />);
        expect(screen.getByTestId("carousel")).toBeInTheDocument();
    });

    it("Should render with a list, children, or both", () => {
        render(
            <Carousel>
                <CarouselItem>First</CarouselItem>
                <CarouselItem>Second</CarouselItem>
            </Carousel>
        );
        expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    it("Should render indicators when enabled", () => {
        render(
            <Carousel showIndicators>
                <CarouselItem>test</CarouselItem>
                <CarouselItem>test</CarouselItem>
            </Carousel>
        );
        const [, , indicators]: Array<HTMLElement> = screen.getAllByRole("list");
        expect(indicators).toBeInTheDocument();
    });

    it("Should trigger carousel items and allow custom duration", async () => {
        const transitionDuration: number = 10000;
        const afterChange: jest.Mock = jest.fn();
        render(
            <Carousel transitionDuration={transitionDuration} afterChange={afterChange}>
                <CarouselItem>test</CarouselItem>
                <CarouselItem>test</CarouselItem>
                test
            </Carousel>
        );
        const [, nextButton]: Array<HTMLButtonElement> = screen.getAllByRole("button");
        expect(afterChange).not.toHaveBeenCalled();
        await userEvent.click(nextButton);
        endMotions();
        expect(afterChange).toBeCalledTimes(1);
    });

    it("Should navigate between slides using nav clicks and keyboard arrows", async () => {
        const afterChange: jest.Mock = jest.fn();
        render(
            <Carousel data-testid="carousel" afterChange={afterChange} showIndicators>
                <CarouselItem>First</CarouselItem>
                <CarouselItem>Second</CarouselItem>
            </Carousel>
        );
        const [prevButton, nextButton]: Array<HTMLButtonElement> = screen.getAllByRole("button");

        // Click next - 1
        await userEvent.click(nextButton);
        endMotions();

        // Click prev - 2
        await userEvent.click(prevButton);
        endMotions();

        // Right arrow key - 3
        await userEvent.keyboard(`{${Key.ArrowRight}}`);
        endMotions();

        // Left arrow key - 4
        await userEvent.keyboard(`{${Key.ArrowLeft}}`);
        endMotions();

        // Space arrow key - 5
        await userEvent.keyboard(`{${Key.Space}}`);
        endMotions();

        // Indicator clicked - 6
        const [, , indicators]: Array<HTMLElement> = screen.getAllByRole("list");

        for (const indicator of indicators.querySelectorAll("li:not(.active)") as any) {
            await userEvent.click(indicator);
            endMotions();
        }

        expect(afterChange).toBeCalledTimes(6);
    });

    it("Should not allow looping when infinite is disabled", async () => {
        render(
            <Carousel infinite={false}>
                <CarouselItem>First</CarouselItem>
                <CarouselItem>Second</CarouselItem>
            </Carousel>
        );
        const [firstCarouselItem, secondCarouselItem]: Array<HTMLLIElement> = screen.getAllByRole("group");
        const [prevButton, nextButton]: Array<HTMLButtonElement> = screen.getAllByRole("button");

        await userEvent.click(nextButton);
        endMotions();
        await userEvent.click(nextButton);
        endMotions();
        await userEvent.click(nextButton);
        endMotions();
        expect(firstCarouselItem).not.toHaveClass("active");
        expect(secondCarouselItem).toHaveClass("active");

        await userEvent.click(prevButton);
        endMotions();
        await userEvent.click(prevButton);
        endMotions();
        await userEvent.click(prevButton);
        endMotions();
        expect(firstCarouselItem).toHaveClass("active");
        expect(secondCarouselItem).not.toHaveClass("active");
    });

    it("Should not allow navigating when transition is occuring", async () => {
        const afterChange: jest.Mock = jest.fn();
        render(
            <Carousel infinite={false} afterChange={afterChange}>
                <CarouselItem>First</CarouselItem>
                <CarouselItem>Second</CarouselItem>
            </Carousel>
        );
        const [, nextButton]: Array<HTMLButtonElement> = screen.getAllByRole("button");
        expect(afterChange).not.toHaveBeenCalled();
        await userEvent.click(nextButton);
        expect(afterChange).not.toHaveBeenCalled();
    });

    it("Should render with fade style", () => {
        render(
            <Carousel data-testid="carousel" transitionStyle="fade">
                <CarouselItem>First</CarouselItem>
                <CarouselItem>Second</CarouselItem>
            </Carousel>
        );
        expect(screen.getByTestId("carousel")).toHaveClass("carousel-fade");
    });

    describe("Should allow swiping with mouse and touch", () => {
        const totalWidth: number = 1000;
        const swipeDistance: number = totalWidth / 4 + 1;

        test("Mouse", async () => {
            const onMouseDown: jest.Mock = jest.fn();
            const { container }: RenderResult = render(
                <Carousel onMouseDown={onMouseDown}>
                    <CarouselItem>First</CarouselItem>
                    <CarouselItem>Second</CarouselItem>
                </Carousel>
            );
            jest.spyOn(container.firstElementChild, "clientWidth", "get").mockImplementation(() => totalWidth);
            const [firstCarouselItem, secondCarouselItem]: Array<HTMLLIElement> = screen.getAllByRole("group");
            expect(firstCarouselItem).toHaveClass("active");
            expect(secondCarouselItem).not.toHaveClass("active");

            // Mouse swipe
            await userEvent.pointer({ keys: "[MouseLeft]" });
            endMotions();
            expect(firstCarouselItem).toHaveClass("active");
            expect(secondCarouselItem).not.toHaveClass("active");

            // Any distance below the swipe triggering distance should be ignored
            endMotions();
            expect(firstCarouselItem).toHaveClass("active");
            expect(secondCarouselItem).not.toHaveClass("active");

            // Swipe past the triggering distance
            await userEvent.pointer([{ keys: "[MouseLeft>]", target: firstCarouselItem }, { coords: { x: swipeDistance } }, "[/MouseLeft]"]);
            endMotions();
            expect(firstCarouselItem).not.toHaveClass("active");
            expect(secondCarouselItem).toHaveClass("active");
            expect(onMouseDown).toBeCalled();
        });

        /**
         * TODO: find a way to mock touch event as current method is rigid and explicit
         */
        test("Touch", async () => {
            const events: Map<EventType, Listener> = new Map<EventType, Listener>();

            document.body.addEventListener = jest.fn((type: EventType, listener: Listener) => {
                events.set(type, listener);
            });
            document.body.removeEventListener = jest.fn((type: EventType) => {
                events.delete(type);
            });

            const onTouchStart: jest.Mock = jest.fn();
            render(
                <Carousel onTouchStart={onTouchStart}>
                    <CarouselItem>First</CarouselItem>
                    <CarouselItem>Second</CarouselItem>
                </Carousel>
            );
            const [firstCarouselItem, secondCarouselItem]: Array<HTMLLIElement> = screen.getAllByRole("group");
            const ev: TouchEvent = document.createEvent("TouchEvent");

            // Touch swipe
            act(() => Simulate.touchStart(firstCarouselItem, { touches: { item: () => ({ clientX: 0 }) } as any }));
            expect(events.has("touchmove")).toBeTruthy();

            // It shouldn't change when clientX is undefined
            jest.spyOn(ev, "touches", "get").mockImplementation(() => ({ item: () => ({ clientX: undefined }) } as any));
            act(() => events.get("touchmove")(ev));
            expect(firstCarouselItem).not.toHaveStyle(`transform: translate3d(${-swipeDistance}px, 0, 0);`);

            // It should change when clientX is defined
            jest.spyOn(ev, "touches", "get").mockImplementation(() => ({ item: () => ({ clientX: -swipeDistance }) } as any));
            act(() => events.get("touchmove")(ev));
            expect(firstCarouselItem).toHaveStyle(`transform: translate3d(${-swipeDistance}px, 0, 0);`);
            act(() => events.get("touchend")(new TouchEvent("touchend")));
            expect(events.has("touchmove")).toBeFalsy();
            endMotions();
            expect(firstCarouselItem).not.toHaveClass("active");
            expect(secondCarouselItem).toHaveClass("active");
            expect(onTouchStart).toBeCalled();
        });
    });

    it("Should allow autoplay", () => {
        jest.useFakeTimers();
        render(
            <Carousel autoplay>
                <CarouselItem>First</CarouselItem>
                <CarouselItem>Second</CarouselItem>
            </Carousel>
        );
        const [firstCarouselItem, secondCarouselItem]: Array<HTMLLIElement> = screen.getAllByRole("group");
        expect(firstCarouselItem).toHaveClass("active");
        expect(secondCarouselItem).not.toHaveClass("active");
        act(() => jest.advanceTimersToNextTimer());
        endMotions();
        expect(secondCarouselItem).toHaveClass("active");
        jest.clearAllTimers();
    });

    it("Should be interrupted on hover", () => {
        jest.useFakeTimers();
        const onMouseEnter: jest.Mock = jest.fn();
        const onMouseLeave: jest.Mock = jest.fn();
        render(
            <Carousel onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} autoplay>
                <CarouselItem>First</CarouselItem>
                <CarouselItem>Second</CarouselItem>
            </Carousel>
        );
        const [firstCarouselItem, secondCarouselItem]: Array<HTMLLIElement> = screen.getAllByRole("group");

        fireEvent.mouseEnter(firstCarouselItem);
        act(() => jest.advanceTimersToNextTimer());
        expect(firstCarouselItem).toHaveClass("active");
        expect(secondCarouselItem).not.toHaveClass("active");

        fireEvent.mouseLeave(firstCarouselItem);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(firstCarouselItem).toHaveClass("active");
        expect(secondCarouselItem).not.toHaveClass("active");

        fireEvent.mouseLeave(firstCarouselItem);
        act(() => jest.advanceTimersToNextTimer());
        endMotions();
        expect(firstCarouselItem).not.toHaveClass("active");
        expect(secondCarouselItem).toHaveClass("active");

        expect(onMouseEnter).toBeCalled();
        expect(onMouseLeave).toBeCalled();

        jest.clearAllTimers();
    });

    it("Should allow passing custom autoplayspeed", () => {
        const autoplaySpeed: number = 9000;
        jest.useFakeTimers();
        render(
            <Carousel autoplay autoplaySpeed={autoplaySpeed}>
                <CarouselItem>First</CarouselItem>
                <CarouselItem>Second</CarouselItem>
            </Carousel>
        );
        const [firstCarouselItem, secondCarouselItem]: Array<HTMLLIElement> = screen.getAllByRole("group");
        expect(firstCarouselItem).toHaveClass("active");
        expect(secondCarouselItem).not.toHaveClass("active");
        act(() => jest.advanceTimersToNextTimer());
        endMotions();
        expect(secondCarouselItem).toHaveClass("active");
        jest.clearAllTimers();
    });
});
