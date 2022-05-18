import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { CarouselItem, CarouselItemProps } from ".";

describe("Component: Carousel", () => {
    function element(i: number): HTMLLIElement {
        return screen.getAllByRole<HTMLLIElement>("group")[i];
    }

    it("Should render", () => {
        render(<CarouselItem />);
        expect(screen.getByRole("group")).toHaveClass("carousel-item");
    });

    it("Should transition correctly and call afterTransition", async () => {
        const afterTransition: jest.Mock = jest.fn();
        render(<Testbed afterTransition={afterTransition} />);
        expect(element(0)).toHaveClass("active");
        expect(element(1)).not.toHaveClass("active");
        await userEvent.click(screen.getByRole("button"));
        expect(element(0)).toHaveClass("carousel-item-left");
        expect(element(1)).toHaveClass("carousel-item-left", "carousel-item-next");
        fireEvent.transitionEnd(element(0));
        fireEvent.animationEnd(element(1));
        expect(element(0)).not.toHaveClass("active");
        expect(element(1)).toHaveClass("active");
        expect(afterTransition).toBeCalled();
    });

    it("Should call onTransitionEnd and onAnimationEnd when passed", async () => {
        const onTransitionEnd: jest.Mock = jest.fn();
        const onAnimationEnd: jest.Mock = jest.fn();
        render(<Testbed onTransitionEnd={onTransitionEnd} onAnimationEnd={onAnimationEnd} />);
        await userEvent.click(screen.getByRole("button"));
        fireEvent.transitionEnd(element(0));
        fireEvent.animationEnd(element(1));
        expect(onTransitionEnd).toBeCalled();
        expect(onAnimationEnd).toBeCalled();
    });

    it("Should accept custom transition duration", () => {
        const transitionDuration: number = 10000;
        render(<CarouselItem transitionDuration={transitionDuration} />);
        expect(screen.getByRole("group")).toHaveStyle({
            "transition-duration": `${transitionDuration}ms`,
            "animation-duration": `${transitionDuration}ms`,
        });
    });

    it("Should render translate value passed when swiping", () => {
        const swipeDistance: number = 200;
        render(<CarouselItem translateX={swipeDistance} defaultChecked />);
        expect(screen.getByRole("group")).toHaveStyle({ transform: `translate3d(${swipeDistance}px, 0, 0)` });
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
