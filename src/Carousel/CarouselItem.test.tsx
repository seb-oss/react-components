import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { CarouselItem, CarouselItemProps } from "./CarouselItem";

describe("Component: Carousel", () => {
    let container: HTMLDivElement = null;
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
            render(<CarouselItem />, container);
        });
        act(() => jest.runOnlyPendingTimers());
        expect(container.firstElementChild).toBeDefined();
        expect(container.firstElementChild.classList.contains("carousel-item")).toBeTruthy();
    });

    it("Should transition correctly and call afterTransition", () => {
        const afterTransition: jest.Mock = jest.fn();
        act(() => {
            render(<Testbed afterTransition={afterTransition} />, container);
        });

        function element(i: number): HTMLDivElement {
            return container.querySelectorAll<HTMLDivElement>(".carousel-item").item(i);
        }

        expect(element(0).classList.contains("active")).toBeFalsy();
        act(() => jest.advanceTimersToNextTimer());
        expect(element(0).classList.contains("active")).toBeTruthy();
        expect(afterTransition).toBeCalled();

        act(() => Simulate.click(container.querySelector("#test")));
        act(() => jest.advanceTimersToNextTimer());
        expect(element(1).classList.contains("active")).toBeTruthy();
    });

    it("Should accept custom transition duration", () => {
        const transitionDuration: number = 10000;
        act(() => {
            render(<CarouselItem defaultChecked transitionDuration={transitionDuration} />, container);
        });
        expect(container.firstElementChild.classList.contains("active")).toBeFalsy();
        act(() => jest.advanceTimersByTime(transitionDuration));
        expect(container.firstElementChild.classList.contains("active")).toBeTruthy();
    });
});

const Testbed: React.FC<CarouselItemProps> = (props: CarouselItemProps) => {
    const [value, setValue] = React.useState<boolean>(false);

    const onClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        setValue(!value);
    }, []);

    return (
        <div>
            <button id="test" onClick={onClick} />
            <CarouselItem afterTransition={props.afterTransition} defaultChecked={!value} nav="next">
                First
            </CarouselItem>
            <CarouselItem afterTransition={props.afterTransition} defaultChecked={value} nav="next">
                Second
            </CarouselItem>
        </div>
    );
};
