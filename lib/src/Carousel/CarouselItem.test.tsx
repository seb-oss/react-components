import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { CarouselItem, CarouselItemProps } from "./CarouselItem";

describe("Component: Carousel", () => {
    let container: HTMLDivElement = null;
    jest.useFakeTimers();

    function element(i: number): HTMLDivElement {
        return container.querySelectorAll<HTMLDivElement>(".carousel-item").item(i);
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
            render(<CarouselItem />, container);
        });
        expect(container.firstElementChild).not.toBeNull();
        expect(container.firstElementChild.classList.contains("carousel-item")).toBeTruthy();
    });

    it("Should transition correctly and call afterTransition", () => {
        const afterTransition: jest.Mock = jest.fn();
        act(() => {
            render(<Testbed afterTransition={afterTransition} />, container);
        });

        expect(element(0).classList.contains("active")).toBeTruthy();
        expect(element(1).classList.contains("active")).toBeFalsy();

        act(() => Simulate.click(container.querySelector("#test")));

        expect(element(0).classList.contains("carousel-item-left")).toBeTruthy();
        expect(element(1).classList.contains("carousel-item-left")).toBeTruthy();
        expect(element(1).classList.contains("carousel-item-next")).toBeTruthy();

        act(() => Simulate.transitionEnd(element(0)));
        act(() => Simulate.animationEnd(element(1)));

        expect(element(0).classList.contains("active")).toBeFalsy();
        expect(element(1).classList.contains("active")).toBeTruthy();
        expect(afterTransition).toBeCalled();
    });

    it("Should call onTransitionEnd and onAnimationEnd when passed", () => {
        const onTransitionEnd: jest.Mock = jest.fn();
        const onAnimationEnd: jest.Mock = jest.fn();
        act(() => {
            render(<Testbed onTransitionEnd={onTransitionEnd} onAnimationEnd={onAnimationEnd} />, container);
        });

        act(() => Simulate.click(container.querySelector("#test")));
        act(() => Simulate.transitionEnd(element(0)));
        act(() => Simulate.animationEnd(element(1)));
        expect(onTransitionEnd).toBeCalled();
        expect(onAnimationEnd).toBeCalled();
    });

    it("Should accept custom transition duration", () => {
        const transitionDuration: number = 10000;
        act(() => {
            render(<CarouselItem transitionDuration={transitionDuration} />, container);
        });
        expect(container.firstElementChild.getAttribute("style")).toContain(`transition-duration: ${transitionDuration}ms;`);
        expect(container.firstElementChild.getAttribute("style")).toContain(`animation-duration: ${transitionDuration}ms;`);
    });

    it("Should render translate value passed when swiping", () => {
        const swipeDistance: number = 200;
        act(() => {
            render(<CarouselItem translateX={swipeDistance} defaultChecked />, container);
        });
        expect(container.firstElementChild.getAttribute("style")).toContain(`transform: translate3d(${swipeDistance}px, 0, 0);`);
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
            <CarouselItem {...props} defaultChecked={!value} nav="next">
                First
            </CarouselItem>
            <CarouselItem {...props} defaultChecked={value} nav="next">
                Second
            </CarouselItem>
        </div>
    );
};
